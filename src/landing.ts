import {
    KTS_TO_FPS,
    FLARE_DURATION,
    LDGDIST_SAFETY_MARGIN,
    VREF_FACTOR,
    STALL_TRANSITION_FACTOR,
} from "./data/values";
import {
    getAircraftData,
    getAirportData,
    getClosestThrust,
    getFlapsReduction,
    getMinimumThrust,
    getRunwayData,
} from "./utils";
import {
    calculateDecelerateDistance
} from "./takeoff";

function calculateLandingDistance(maxSpeed: number, tSpeed: number, maxAcceleration: number, flaps: number, Vref: number, useReverseThrust: boolean) {
    const flareDistance = Vref * FLARE_DURATION * KTS_TO_FPS;
    const Vref_thrust = getMinimumThrust(maxSpeed, tSpeed, flaps, Vref) / 100;
    const rolloutDistance = calculateDecelerateDistance(maxSpeed, tSpeed, maxAcceleration, flaps, Vref_thrust, Vref, useReverseThrust);
    const actualLength = flareDistance + rolloutDistance;
    return Math.ceil(actualLength);
}

// v_ref = 1.3 stall speed in configuration
function calculateLandingPerformanceData(
    maxSpeed: number,
    tSpeed: number,
    maxAcceleration: number,
    flaps: number,
    lda: number,
    useReverseThrust: boolean,
) {
    // calculate stall speed
    const Vstall_noflaps = STALL_TRANSITION_FACTOR * tSpeed;
    const Vstall = Vstall_noflaps - getFlapsReduction(maxSpeed, tSpeed, flaps, Vstall_noflaps);

    const Vref = Math.floor(Vstall * VREF_FACTOR);
    const Vapp = Vref + 5;
    const actualLength = calculateLandingDistance(maxSpeed, tSpeed, maxAcceleration, flaps, Vref, useReverseThrust);
    const ald = Math.ceil(actualLength);
    const ldr = Math.ceil(actualLength * LDGDIST_SAFETY_MARGIN);
    const margin = lda - ldr;
    const canStop = margin > 0;
    return {
        canStop: canStop,
        ald: ald,
        lda: lda,
        ldr: ldr,
        margin: margin,
        Vref: Vref,
        Vapp: Vapp,
    };
}

function calculateLandingPerformance(
    type: string,
    airport: string,
    runway: string,
    flapsSetting: number,
    deceleration: string
) {
    const aptData = getAirportData(airport);
    if (!aptData) {
        return;
    }
    const rwyData = getRunwayData(aptData, runway);
    if (!rwyData) {
        return;
    }

    const acftData = getAircraftData(type);
    if (!acftData) {
        return;
    }

    const flaps = (acftData.numFlaps > 0) ? ((flapsSetting || 0) / acftData.numFlaps) : 0;
    const useReverseThrust = deceleration == "max-rev";

    const lda = rwyData.lda;
    const maxSpeed = acftData.speeds.max;
    const tSpeed = acftData.speeds.transition;
    const acceleration = acftData.acceleration;

    const performance = calculateLandingPerformanceData(
        maxSpeed,
        tSpeed,
        acceleration,
        flaps,
        lda,
        useReverseThrust
    );
    console.log("vapp:", performance.Vapp);
    const VappThrust = getClosestThrust(
        maxSpeed,
        tSpeed,
        flaps,
        performance.Vapp
    );
    console.log(VappThrust);
    return {
        ...performance,
        thrust: VappThrust,
    };
}

export { calculateLandingPerformance };

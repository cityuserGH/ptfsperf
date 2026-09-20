import {
    KTS_TO_FPS,
    FLARE_DURATION,
    LDGDIST_SAFETY_MARGIN,
    VREF_FACTOR,
} from "./data/values";
import {
    getAircraftData,
    getAirportData,
    getClosestThrust,
    getFlapsMaxSpeed,
    getMinimumThrust,
    getRunwayData,
} from "./utils";
import {
    calculateDecelerateDistance
} from "./takeoff";

function calculateLandingDistance(Vref: number, maxSpeed: number, maxAcceleration: number, useReverseThrust: boolean) {
    const flareDistance = Vref * FLARE_DURATION * KTS_TO_FPS;
    const Vref_thrust = getMinimumThrust(maxSpeed, Vref) / 100;
    const rolloutDistance = calculateDecelerateDistance(Vref, Vref_thrust, maxSpeed, maxAcceleration, useReverseThrust);
    const actualLength = flareDistance + rolloutDistance;
    return Math.ceil(actualLength);
}

// v_ref = 1.3 stall speed in configuration
function calculateLandingPerformanceData(
    lda: number,
    stallSpeed: number,
    maxSpeed: number,
    maxAcceleration: number,
    useReverseThrust: boolean,
) {
    const Vref = Math.ceil(stallSpeed * VREF_FACTOR);
    const Vapp = Vref + 5;
    const actualLength = calculateLandingDistance(Vref, maxSpeed, maxAcceleration, useReverseThrust);
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
    flaps: number,
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

    const useReverseThrust = deceleration == "max-rev";

    const lda = rwyData.lda;
    const flaps_fraction = (flaps || 0) / (acftData.flaps.length);
    const Vstall = Math.ceil(acftData.speeds.stall - flaps_fraction * acftData.maxFlapReduction);
    const maxSpeedWithFlaps = getFlapsMaxSpeed(acftData.speeds.max, flaps_fraction);
    const acceleration = acftData.acceleration;


    const performance = calculateLandingPerformanceData(
        lda,
        Vstall,
        maxSpeedWithFlaps,
        acceleration,
        useReverseThrust,
    );
    const VappThrust = getClosestThrust(
        maxSpeedWithFlaps,
        performance.Vapp
    );

    return {
        ...performance,
        thrust: VappThrust,
    };
}

export { calculateLandingPerformance };

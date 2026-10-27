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
    getWindComponents,
} from "./utils";
import { calculateDecelerateDistance } from "./takeoff";

function calculateLandingDistance(
    maxSpeed: number,
    tSpeed: number,
    maxAcceleration: number,
    flaps: number,
    Vref: number,
    useReverseThrust: boolean,
    headwindKts = 0,
) {
    // VREF remains an airspeed reference.
    // Estimate the ground speed at touchdown.
    const touchdownGroundSpeed = Math.max(0, Vref - headwindKts);

    // Distance travelled during the flare.
    const flareDistance =
        touchdownGroundSpeed * FLARE_DURATION * KTS_TO_FPS;

    // Calculate the required thrust using the airspeed reference.
    const Vref_thrust =
        getMinimumThrust(maxSpeed, tSpeed, flaps, Vref) / 100;

    // Start the rollout simulation at touchdown ground speed.
    // The simulation then models this speed directly, so do not apply
    // the wind correction a second time inside calculateDecelerateDistance.
    const rolloutDistance = calculateDecelerateDistance(
        maxSpeed,
        tSpeed,
        maxAcceleration,
        flaps,
        Vref_thrust,
        touchdownGroundSpeed,
        useReverseThrust,
        0,
    );

    return Math.ceil(flareDistance + rolloutDistance);
}

// VREF = 1.3 x the modelled stall speed in the selected configuration.
function calculateLandingPerformanceData(
    maxSpeed: number,
    tSpeed: number,
    maxAcceleration: number,
    flaps: number,
    lda: number,
    useReverseThrust: boolean,
    headwindKts = 0,
) {
    const Vstall_noflaps = STALL_TRANSITION_FACTOR * tSpeed;
    const Vstall = Vstall_noflaps - getFlapsReduction(maxSpeed, tSpeed, flaps, Vstall_noflaps);

    // VREF and VAPP remain airspeed references; no wind correction is applied to them.
    const Vref = Math.floor(Vstall * VREF_FACTOR);
    const Vapp = Vref + 5;
    const actualLength = calculateLandingDistance(
        maxSpeed,
        tSpeed,
        maxAcceleration,
        flaps,
        Vref,
        useReverseThrust,
        headwindKts,
    );
    const ald = Math.ceil(actualLength);
    const ldr = Math.ceil(actualLength * LDGDIST_SAFETY_MARGIN);
    const margin = lda - ldr;
    const canStop = margin > 0;
    return {
        canStop,
        ald,
        lda,
        ldr,
        margin,
        Vref,
        Vapp,
    };
}

function calculateLandingPerformance(
    type: string,
    airport: string,
    runway: string,
    flapsSetting: number,
    deceleration: string,
    windSpeedKts = 0,
    windDirectionDeg = 0,
) {
    const aptData = getAirportData(airport);
    if (!aptData) return;

    const rwyData = getRunwayData(aptData, runway);
    if (!rwyData) return;

    const acftData = getAircraftData(type);
    if (!acftData) return;

    const wind = getWindComponents(
        Math.max(0, Number.isFinite(windSpeedKts) ? windSpeedKts : 0),
        Number.isFinite(windDirectionDeg) ? windDirectionDeg : 0,
        rwyData.heading,
    );

    const flaps = acftData.numFlaps > 0 ? ((flapsSetting || 0) / acftData.numFlaps) : 0;
    const useReverseThrust = deceleration === "max-rev";

    const performance = calculateLandingPerformanceData(
        acftData.speeds.max,
        acftData.speeds.transition,
        acftData.acceleration,
        flaps,
        rwyData.lda,
        useReverseThrust,
        wind.headwind,
    );

    const thrust = getClosestThrust(
        acftData.speeds.max,
        acftData.speeds.transition,
        flaps,
        performance.Vapp,
    );

    return {
        ...performance,
        thrust,
        wind,
    };
}

export { calculateLandingPerformance };

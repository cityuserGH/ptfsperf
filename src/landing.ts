import {
    KTS_TO_FPS,
    FLARE_DURATION,
    LDGDIST_SAFETY_MARGIN,
} from "./data/values";
import {
    getAircraftData,
    getAirportData,
    getDecelerationRate,
    getFlapReduction,
    getMinimumThrust,
    getRunwayData,
} from "./utils";

function calculateActualLandingDistanceVapp(Vapp: number, decelRate: number) {
    const Vapp_fps = Vapp * KTS_TO_FPS;
    const decel_fps = decelRate * KTS_TO_FPS;

    const flareSpeed_fps = 0.98 * Vapp_fps;
    const flareLength = flareSpeed_fps * FLARE_DURATION;

    const touchdownSpeed_fps = 0.96 * Vapp_fps;
    const rolloutLength =
        (touchdownSpeed_fps * touchdownSpeed_fps) / (decel_fps * 2);

    const actualLength = flareLength + rolloutLength;
    return Math.ceil(actualLength);
}

function calculateActualLandingDistance(Vref: number, decelRate: number) {
    const Vref_fps = Vref * KTS_TO_FPS;
    const decel_fps = decelRate * KTS_TO_FPS;

    const flareLength = Vref_fps * FLARE_DURATION;

    const rolloutLength = (Vref_fps * Vref_fps) / (decel_fps * 2);

    const actualLength = flareLength + rolloutLength;
    return Math.ceil(actualLength);
}

// v_ref = 1.3 stall speed in configuration
function calculateLandingPerformanceData(
    lda: number,
    stallSpeed: number,
    flapReduction: number,
    decelerationRate: number
) {
    const Vref = Math.ceil((stallSpeed - flapReduction) * 1.23);
    const Vapp = Vref + 5;
    const actualLength = calculateActualLandingDistance(Vref, decelerationRate);
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
    const flapReduction = getFlapReduction(acftData, flaps);
    const Vstall = acftData.speeds.stall;
    const lda = rwyData.lda;
    const decelRate = getDecelerationRate(acftData, deceleration);
    if (!decelRate) {
        return;
    }

    const performance = calculateLandingPerformanceData(
        lda,
        Vstall,
        flapReduction,
        decelRate
    );
    const thrustRequired = getMinimumThrust(
        acftData.speedData,
        performance.Vapp + flapReduction
    );

    return {
        ...performance,
        thrust: thrustRequired,
    };
}

export { calculateLandingPerformance };

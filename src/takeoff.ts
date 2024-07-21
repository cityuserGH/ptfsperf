import { AircraftData, RunwayData } from "./types";

import {
    KTS_TO_FPS,
    FPS_TO_KTS,
    TORA_SAFETY_MARGIN,
    CLIMBOUT_SPEED_LOSS,
} from "./data/values";

import {
    getAccelerationRate,
    getAircraftData,
    getAirportData,
    getDecelerationRate,
    getFlapReduction,
    getMinimumThrust,
    getRunwayData,
} from "./utils";

// asda = accelerate stop distance available
function calculateV1(
    VR_kts: number,
    accRate: number,
    decelRate: number,
    asda: number
) {
    // V1 in feet per second
    // v = sqrt ( 2 * runway length / (1/rate-acc + 1/rate-dec) )

    /* 
    const calc_V1_fps_1 = Math.sqrt(
        (2 * runwayLength) / (1.0 / accRate + 1.0 / decelRate)
    );
    */

    // with margin 2 seconds of V1 speed added
    const calc_V1_fps =
        ((Math.SQRT2 *
            Math.sqrt(
                asda * accRate + asda * decelRate + 2 * accRate * decelRate
            )) /
            Math.sqrt(accRate * decelRate) -
            2) /
        (1 / accRate + 1 / decelRate);

    const calc_V1_kts = Math.floor(calc_V1_fps * FPS_TO_KTS);

    // V1 >= 100 kts
    if (calc_V1_kts < 100) {
        return -1;
    }

    // V1 <= VR
    const actual_V1_kts = Math.min(calc_V1_kts, VR_kts);
    return actual_V1_kts;
}

function calculateLiftoffDistance(V2_kts: number, accRate: number) {
    const V2_fps = V2_kts * KTS_TO_FPS;
    const liftoffDistance = (V2_fps * V2_fps) / (accRate * 2);
    return liftoffDistance * TORA_SAFETY_MARGIN;
}

function calculateTakeoffPerformanceData(
    runwayData: RunwayData,
    aircraftData: AircraftData,
    takeoffShift: number,
    flapReduction: number
) {
    const asda = runwayData.asda - takeoffShift;
    const tora = runwayData.tora - takeoffShift;

    const V_R = aircraftData.speeds.rotate - flapReduction;
    const V_2 = V_R + 4;

    const climboutSpeed = V_2 + 10 + CLIMBOUT_SPEED_LOSS;

    // thrust is NOT affected by flap reduction
    const minimumThrust = getMinimumThrust(
        aircraftData.speedData,
        climboutSpeed + flapReduction
    );

    let V_1 = -1;
    let canAccStop = false;
    let canLiftoff = false;
    let thrust = minimumThrust - 1;
    while (thrust < 100 && (!canAccStop || !canLiftoff)) {
        thrust++;
        const accRate = getAccelerationRate(
            aircraftData.accelerationData,
            thrust
        );
        const decelRate = getDecelerationRate(aircraftData, "no-rev");
        if (decelRate) {
            V_1 = calculateV1(V_R, accRate, decelRate, asda);
            canAccStop = !(V_1 === -1);
            canLiftoff = tora > calculateLiftoffDistance(V_2, accRate);
        }
    }

    return {
        canLiftoff: canLiftoff,
        canAccelStop: canAccStop,
        data: {
            thrust: thrust,
            v1: V_1,
            vr: V_R,
            v2: V_2,
        },
    };
}

function calculateTakeoffPerformance(
    type: string,
    airport: string,
    runway: string,
    intersection: string,
    flaps: number
) {
    // data in

    const aptData = getAirportData(airport);
    if (!aptData) {
        return;
    }
    const rwyData = getRunwayData(aptData, runway);
    if (!rwyData) {
        return;
    }
    const takeoffShift =
        rwyData.intersections.find((hold) => hold.name === intersection)
            ?.shift || 0;

    const acftData = getAircraftData(type);
    if (!acftData) {
        return;
    }
    const flapReduction = getFlapReduction(acftData, flaps);

    return calculateTakeoffPerformanceData(
        rwyData,
        acftData,
        takeoffShift,
        flapReduction
    );
}

export { calculateTakeoffPerformance };

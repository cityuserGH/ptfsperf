import { AircraftData, RunwayData } from "./types";

import {
    KTS_TO_FPS,
    FPS_TO_KTS,
    TORA_SAFETY_MARGIN,
    CLIMBOUT_SPEED_LOSS,
    ROTATE_DURATION,
    SECONDS_PER_THRUST_SETTING,
} from "./data/values";

import {
    getAccelerationRate,
    getAircraftData,
    getAirportData,
    getDecelerationRate,
    getFlapReduction,
    getMaxSpeed,
    getMinimumThrust,
    getRunwayData,
} from "./utils";

// asda = accelerate stop distance available
function calculateV1(
    VR_kts: number,
    thrust: number,
    accRate: number,
    decelRate: number,
    asda: number
) {
    let V1_kts = VR_kts;

    while (V1_kts >= 100) {
        const V1_fps = V1_kts * KTS_TO_FPS;

        /*  for determining exact performance when increasing thrust from 0
        const timeToIncreaseThrust = thrust * SECONDS_PER_THRUST_SETTING;
        const distanceToIncreaseThrust = (accRate / 2) * timeToIncreaseThrust;
        */

        // distance to accelerate to V1 speed
        const accelerateDistance = (V1_fps * V1_fps) / (2 * accRate);

        // distance required to "switcheroo" from takeoff thrust to idle thrust

        // assume we go from accRate to decelRate linearly
        const timeToDecreaseThrust = thrust * SECONDS_PER_THRUST_SETTING; // todo
        // the speed of the aircraft once we are applying decelRate
        const speedAtIdleThrust_fps =
            V1_fps + (timeToDecreaseThrust * (accRate + decelRate)) / 2;

        // integral of quadratic function
        // from V1 (at t=0, slope accRate)
        // to speedAtIdleThrust (t=timeToDecreaseThrust, slope decelRate)
        const switcherooDistance =
            V1_fps * timeToDecreaseThrust +
            (timeToDecreaseThrust *
                (2 * speedAtIdleThrust_fps + accRate * timeToDecreaseThrust)) /
                6;

        // distance to stop while at idle thrust
        const decelerateDistance = Math.abs(
            (speedAtIdleThrust_fps * speedAtIdleThrust_fps) / (2 * decelRate)
        );

        // safety/decision margin, 2 seconds at V1
        const decisionDistance = 2 * V1_fps;

        const totalDistanceToStop =
            accelerateDistance +
            decisionDistance +
            switcherooDistance +
            decelerateDistance;

        if (totalDistanceToStop < asda) {
            return V1_kts;
        }
        V1_kts--;
    }
    return -1;
}

function calculateLiftoffDistance(
    VR_kts: number,
    thrustMax_kts: number,
    accRate: number
) {
    const VR_fps = VR_kts * KTS_TO_FPS;
    const thrustMax_fps = thrustMax_kts * KTS_TO_FPS;
    const accelerateDistance = (VR_fps * VR_fps) / (accRate * 2);

    const speedAfterRotation = Math.min(
        thrustMax_fps,
        VR_fps + accRate * ROTATE_DURATION
    );

    const rotateDistance =
        ROTATE_DURATION * VR_fps +
        (ROTATE_DURATION * (speedAfterRotation - VR_fps)) / 2;
    const takeoffDistance = accelerateDistance + rotateDistance;
    const requiredDistance = takeoffDistance * TORA_SAFETY_MARGIN;
    return requiredDistance;
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

        // in feet/second^2
        const accRate = getAccelerationRate(
            aircraftData.accelerationData,
            thrust
        );
        const maxSpeedAtThrust = getMaxSpeed(aircraftData.speedData, thrust);

        const requiredDistance = calculateLiftoffDistance(
            V_R,
            maxSpeedAtThrust,
            accRate
        );
        canLiftoff = tora > requiredDistance;

        const decelRate = KTS_TO_FPS * aircraftData.deceleration.noReversers;
        V_1 = calculateV1(V_R, thrust, accRate, decelRate, asda);
        canAccStop = !(V_1 === -1);
    }

    return {
        canLiftoff: canLiftoff,
        canAccelStop: canAccStop,
        thrust: thrust,
        v1: V_1,
        vr: V_R,
        v2: V_2,
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

import { AircraftData } from "./types";

import {
    KTS_TO_FPS,
    TORA_SAFETY_MARGIN,
    ROTATE_DURATION,
    FULL_THRUST_TIME,
    VMCG_VR_FACTOR,
    DELTA_T,
    APPROACHING_THROTTLE_SPEED_FRACTION,
    LOW_REGIME_THRESHOLD,
    HIGH_REGIME_THRESHOLD,
    THRUST_SPEED_ACCELERATION
} from "./data/values";

import {
    getAircraftData,
    getAirportData,
    getFlapsMaxSpeed,
    getMinimumThrust,
    getRunwayData,
    getThrustSpeed,
} from "./utils";

function calculateV1(
    VR_kts: number,
    thrust: number,
    maxSpeed: number,
    maxAcceleration: number,
    asda: number // accelerate stop distance available
) {
    const minimumV1_kts = Math.ceil(VR_kts * VMCG_VR_FACTOR);

    let V1_kts = VR_kts;
    let totalDistanceToStop = 0;
    while (V1_kts >= minimumV1_kts) {
        // distance to accelerate to V1 speed
        const accelerateDistance = calculateAccelerateDistance(V1_kts, thrust, maxSpeed, maxAcceleration, false);

        // we are at V1, retard and stop (decelerate)
        const decelerateDistance = calculateDecelerateDistance(V1_kts, thrust, maxSpeed, maxAcceleration, false);

        // safety margin, 2 seconds at V1, arbitrary but by-the-book
        const safetyMarginDistance = 2 * V1_kts * KTS_TO_FPS;

        totalDistanceToStop = Math.ceil(
            accelerateDistance +
                decelerateDistance + 
                safetyMarginDistance
        );

        if (totalDistanceToStop < asda) {
            return {
                asdist: totalDistanceToStop,
                v1: V1_kts,
            };
        }
        V1_kts--;
    }
    return { asdist: totalDistanceToStop, v1: -1 };
}

function calculateNewSpeed(
    thrust: number,
    maxSpeed: number,
    maxAcceleration: number,
    speed: number,
    dt: number,
    reverseThrust: number = 0,
) {
    const thrustSpeed = getThrustSpeed(maxSpeed, thrust);

    let acceleration;
    if (speed < thrustSpeed) {
        // acceleration
        const lowRegimeAccel = thrust * maxAcceleration;
        const highRegimeAccel = (1.5 * thrust - 0.5) * maxAcceleration;

        const approachingSpeed = APPROACHING_THROTTLE_SPEED_FRACTION * thrustSpeed;

        // determine acceleration
        if (speed < LOW_REGIME_THRESHOLD) {
            // low speed regime
            acceleration = lowRegimeAccel;

        } else if (speed < HIGH_REGIME_THRESHOLD) {
            // transition regime
            const fraction = (speed - LOW_REGIME_THRESHOLD) / (HIGH_REGIME_THRESHOLD - LOW_REGIME_THRESHOLD);
            acceleration = fraction * highRegimeAccel + (1 - fraction) * lowRegimeAccel;

        } else if (speed < approachingSpeed) {
            // high speed regime
            acceleration = highRegimeAccel;
        } else if (speed <= thrustSpeed) {
            // approaching
            const fraction = (speed - approachingSpeed) / (thrustSpeed - approachingSpeed);
            acceleration = fraction * THRUST_SPEED_ACCELERATION + (1 - fraction) * highRegimeAccel;
        } else {
            acceleration = 0;
        }
    } else if (speed > thrustSpeed) {
        // deceleration **ON THE GROUND**

        const LOW_BRAKING_THRESHOLD = 80;
        const IDLE_THRUST_BRAKING = -7;
        const FULL_REVERSE_BRAKING = -9;

        if (reverseThrust > 0) {
            acceleration = reverseThrust * FULL_REVERSE_BRAKING;
        } else {
            // acceleration decreases from around 80 kts to 0 kts
            // assuming thrust is 0... what if it isn't?
            const approachingSpeed = LOW_BRAKING_THRESHOLD;
            if (speed > approachingSpeed) {
                acceleration = IDLE_THRUST_BRAKING; // what is this number? does it depend on max acceleration? is it separate or fixed?
            } else {
                // approaching
                const fraction = (speed - thrustSpeed) / (approachingSpeed - thrustSpeed);
                acceleration = IDLE_THRUST_BRAKING / 2 * (1 + fraction);
            }
        }

    } else {
        // none
        acceleration = 0;
    }
    // calculate speed change given dt
    const unclamped = speed + dt * acceleration;
    let clamped;
    if (speed < thrustSpeed) {
        // clamp acceleration
        clamped = Math.max(Math.min(thrustSpeed, unclamped), 0);
    } else if (speed > thrustSpeed) {
        // clamp deceleration
        clamped = Math.max(Math.max(thrustSpeed, unclamped), 0);
    } else {
        clamped = thrustSpeed;
    }
    //console.log("new speed:", clamped);
    return clamped;
}

function calculateAccelerateDistance(
    targetSpeed: number,
    thrust: number,
    maxSpeed: number,
    maxAcceleration: number,
    includeLiftoff: boolean,
) {
    // estimate with trapizodial rule

    // reachable at all?
    if (targetSpeed > getThrustSpeed(maxSpeed, thrust)) {
        return Number.MAX_SAFE_INTEGER;
    }

    const dt = DELTA_T;
    let currentSpeed = 0;
    let distance = 0;
    // power-up
    const powerUpTime = thrust * FULL_THRUST_TIME;
    const powerUpDeltas = powerUpTime / dt;
    for (let i = 0; i < powerUpDeltas; i++) {
        const thrustSoFar = thrust * i / powerUpDeltas;
        const newSpeed = calculateNewSpeed(thrustSoFar, maxSpeed, maxAcceleration, currentSpeed, dt);
        distance += dt * (currentSpeed + newSpeed) / 2; // average of prior and later
        currentSpeed = newSpeed;
    }

    // continue until rotation speed
    while (currentSpeed < targetSpeed) {
        const newSpeed = calculateNewSpeed(thrust, maxSpeed, maxAcceleration, currentSpeed, dt);
        distance += dt * (currentSpeed + newSpeed) / 2;
        currentSpeed = newSpeed;
    }

    if (includeLiftoff) {
        // add rotate distance
        const rotationTime = ROTATE_DURATION;
        const rotationDeltas = rotationTime / dt;
        for (let i = 0; i < rotationDeltas; i++) {
            const newSpeed = calculateNewSpeed(thrust, maxSpeed, maxAcceleration, currentSpeed, dt);
            distance += dt * (currentSpeed + newSpeed) / 2;
            currentSpeed = newSpeed;
        }
    }

    return distance * KTS_TO_FPS;
}

function calculateDecelerateDistance(
    startSpeed: number,
    initialThrust: number,
    maxSpeed: number,
    maxAcceleration: number,
    useReverseThrust: boolean,
) {

    const dt = DELTA_T;
    let currentSpeed = startSpeed;
    let distance = 0;
    // power-down
    const retardTime = initialThrust * FULL_THRUST_TIME;
    const retardDeltas = retardTime / dt;
    for (let i = 0; i < retardDeltas; i++) {
        const thrustSoFar = initialThrust * (1 - i / retardDeltas);
        const newSpeed = calculateNewSpeed(thrustSoFar, maxSpeed, maxAcceleration, currentSpeed, dt);
        distance += dt * (currentSpeed + newSpeed) / 2;
        currentSpeed = newSpeed;
    }

    // increase reverse thrust
    if (useReverseThrust) {
        const reverseTime = FULL_THRUST_TIME;
        const reverseDeltas = reverseTime / dt;
        for (let i = 0; i < reverseDeltas; i++) {
            const reverseSoFar =  i / reverseDeltas;
            const newSpeed = calculateNewSpeed(0, maxSpeed, maxAcceleration, currentSpeed, dt, reverseSoFar);
            distance += dt * (currentSpeed + newSpeed) / 2;
            currentSpeed = newSpeed;
        }
    }
    // continue until we stop
    const reverseThrust = useReverseThrust ? 1 : 0;
    while (currentSpeed > 0.5) {
        const newSpeed = calculateNewSpeed(0, maxSpeed, maxAcceleration, currentSpeed, dt, reverseThrust);
        distance += dt * (currentSpeed + newSpeed) / 2;
        currentSpeed = newSpeed;
    }

    return distance * KTS_TO_FPS;
}

function calculateTakeoffPerformanceData(
    aircraftData: AircraftData,
    asda: number,
    tora: number,
    flapsFraction: number
) {
    const V_R = Math.ceil(aircraftData.speeds.transition + 1 - flapsFraction * aircraftData.maxFlapReduction);
    const V_2 = V_R + 4;

    const climboutSpeed = V_2;

    // flaps max speed
    const maxSpeed = getFlapsMaxSpeed(aircraftData.speeds.max, flapsFraction);
    const maxAcceleration = aircraftData.acceleration; // does not depend on flaps

    const minimumThrust = getMinimumThrust(maxSpeed, climboutSpeed);

    let V_1 = -1;
    let canAccStop = false;
    let canLiftoff = false;
    let liftoffDistance = 0;
    let takeoffRun = 0;
    let accelerateStopDistance = 0;
    let thrust = minimumThrust - 1;
    while (thrust < 100 && (!canAccStop || !canLiftoff)) {
        thrust++;

        liftoffDistance = Math.ceil(calculateAccelerateDistance(V_R, thrust / 100, maxSpeed, maxAcceleration, true));
        takeoffRun = Math.ceil(liftoffDistance * TORA_SAFETY_MARGIN);
        canLiftoff = tora > takeoffRun;

        // deceleration, V1 speed

        ({ v1: V_1, asdist: accelerateStopDistance } = calculateV1(
            V_R,
            thrust / 100,
            maxSpeed,
            maxAcceleration,
            asda
        ));
        canAccStop = !(V_1 === -1);
    }

    return {
        canLiftoff: canLiftoff,
        canAccelStop: canAccStop,
        thrust: thrust,
        v1: V_1,
        vr: V_R,
        v2: V_2,
        atod: liftoffDistance,
        torun: takeoffRun,
        asdist: accelerateStopDistance,
    };
}

function calculateTakeoffPerformance(
    type: string,
    airport: string,
    runway: string,
    intersection: string,
    flaps: number
) {
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

    const asda = rwyData.asda - takeoffShift;
    const tora = rwyData.tora - takeoffShift;

    const acftData = getAircraftData(type);
    if (!acftData) {
        return;
    }

    const flapsFraction = (flaps || 0) / (acftData.flaps.length);

    const performance = calculateTakeoffPerformanceData(
        acftData,
        asda,
        tora,
        flapsFraction
    );
    return { ...performance, asda, tora };
}

export { calculateTakeoffPerformance, calculateDecelerateDistance };

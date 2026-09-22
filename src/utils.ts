import { AirportData } from "./types";
import { aircraftData } from "./data/aircraft";
import { airportData } from "./data/airports";
import { TRANSITION_THRUST_X, TRANSITION_THRUST_Y } from "./data/values";

function getFlapsReduction(maxSpeed: number, tSpeed: number, flaps: number, speed: number) {
    const flapReductionFraction = 0.17; // % of transition speed
    const noFlapReduction = 0.4; // up to % of transition speed
    const regimeChange = 0.8; // % of max speed
    const maxFlapReductionFraction = 0.117; // % of max speed

    let fullFlapsReduction = 0;
    if (speed < noFlapReduction * tSpeed) {
        // no flap reduction
        fullFlapsReduction = 0;
    } else if (speed < tSpeed) {
        // flap reduction increases to 0.17 * transitionSpeed
        const t = Math.max(Math.min((speed - noFlapReduction * tSpeed) / ((1 - noFlapReduction) * tSpeed), 1), 0);
        fullFlapsReduction = t * flapReductionFraction * tSpeed;
    } else if (speed < regimeChange * maxSpeed) {
        // constant
        fullFlapsReduction = flapReductionFraction * tSpeed;
    } else {
        // increases to max speed (approx.)
        const t = Math.max(Math.min((speed - regimeChange * maxSpeed) / ((1 - regimeChange) * maxSpeed), 1), 0);
        fullFlapsReduction = (1 - t) * flapReductionFraction * tSpeed + t * maxFlapReductionFraction * maxSpeed;
    }
    return flaps * fullFlapsReduction;
}

// Get the speed (kts) at a certain thrust level
function getThrustSpeed(maxSpeed: number, tSpeed: number, flaps: number, thrust: number) {
    const highRegimeSlope = (1 - TRANSITION_THRUST_Y) / (1 - TRANSITION_THRUST_X);
    let speed_noflaps = 0;
    // high or low speed regime?
    if (thrust > TRANSITION_THRUST_X) {
        // high speed regime
        const fraction = highRegimeSlope * thrust - highRegimeSlope + 1;
        speed_noflaps = fraction * maxSpeed;
    } else {
        // low speed regime
        // quadratic joining at transition fraction
        // y = ax^2 where a = transition_y / (transition_x^2)
        const a = TRANSITION_THRUST_Y / (TRANSITION_THRUST_X * TRANSITION_THRUST_X);
        const fraction = a * thrust * thrust;
        speed_noflaps = fraction * maxSpeed;
    }
    const speed = speed_noflaps - getFlapsReduction(maxSpeed, tSpeed, flaps, speed_noflaps);
    return speed;
}

// Closest % for display purposes
// Note that values X.0 -> X.99 are displayed as "X" in-game
// Therefore, we calculate X as X.5 but display X
function getClosestThrust(maxSpeed: number, tSpeed: number, flaps: number, speed: number) {
    let minimumDifference = speed;
    let closestThrust = 0;
    for (let thrust = 1; thrust < 100; thrust++) {
        const thrustSpeed = getThrustSpeed(maxSpeed, tSpeed, flaps, (thrust + 0.5) / 100);
        const candidateDifference = Math.abs(thrustSpeed - speed);
        if (candidateDifference < minimumDifference) {
            minimumDifference = candidateDifference;
            closestThrust = thrust;
        }
    }
    return closestThrust;
}

// Get the thrust required to reach at least the speed (kts) provided
function getMinimumThrust(maxSpeed: number, tSpeed: number, flaps: number, speed: number) {
    for (let thrust = 1; thrust < 100; thrust++) {
        if (getThrustSpeed(maxSpeed, tSpeed, flaps, thrust / 100) > speed) {
            return thrust;
        }
    }
    return -1;
}

function getAircraftData(typeCode: string) {
    return aircraftData.find((acft) => acft.type === typeCode);
}

function getAirportData(icao: string) {
    return airportData.find((apt) => apt.icao === icao);
}

function getRunwayData(airport: AirportData, runway: string) {
    return airport.runways.find((rwy) => rwy.name === runway);
}

export {
    getThrustSpeed,
    getClosestThrust,
    getMinimumThrust,
    getFlapsReduction,
    getAircraftData,
    getAirportData,
    getRunwayData,
};

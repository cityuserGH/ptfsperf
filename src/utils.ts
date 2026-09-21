import { AirportData } from "./types";
import { aircraftData } from "./data/aircraft";
import { airportData } from "./data/airports";
import { TRANSITION_THRUST_X, TRANSITION_THRUST_Y } from "./data/values";

// Get the speed (kts) at a certain thrust level
function getThrustSpeed(maxSpeed: number, thrust: number) {
    const highRegimeSlope = (1 - TRANSITION_THRUST_Y) / (1 - TRANSITION_THRUST_X);

    // high or low speed regime?
    if (thrust > TRANSITION_THRUST_X) {
        // high speed regime
        const fraction = highRegimeSlope * thrust - highRegimeSlope + 1;
        const speed = fraction * maxSpeed;
        return speed;
    } else {
        // low speed regime
        // quadratic joining at transition fraction
        // y = ax^2 where a = transition_y / (transition_x^2)
        const a = TRANSITION_THRUST_Y / (TRANSITION_THRUST_X * TRANSITION_THRUST_X);
        const fraction = a * thrust * thrust;
        return fraction * maxSpeed;
    }
}

function getClosestThrust(maxSpeed: number, speed: number) {
    let minimumDifference = speed;
    let closestThrust = 0;
    for (let thrust = 1; thrust < 100; thrust++) {
        const thrustSpeed = getThrustSpeed(maxSpeed, thrust / 100);
        const candidateDifference = Math.abs(thrustSpeed - speed);
        if (candidateDifference < minimumDifference) {
            minimumDifference = candidateDifference;
            closestThrust = thrust;
        }
    }
    return closestThrust;
}

// Get the thrust required to reach at least the speed (kts) provided
function getMinimumThrust(maxSpeed: number, speed: number) {
    for (let thrust = 1; thrust < 100; thrust++) {
        if (getThrustSpeed(maxSpeed, thrust / 100) > speed) {
            return thrust;
        }
    }
    return -1;
}

// Get flaps max speed given fraction extended
function getFlapsMaxSpeed(maxSpeed: number, flap_fraction: number) {
    const FLAP_SLOPE = 0.1167;
    const fraction = 1 - FLAP_SLOPE * flap_fraction;
    return fraction * maxSpeed;
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
    getFlapsMaxSpeed,
    getAircraftData,
    getAirportData,
    getRunwayData,
};

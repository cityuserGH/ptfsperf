import { AircraftData, AirportData, LinearData, QuadraticData } from "./types";
import { KTS_TO_FPS } from "./data/values";
import { aircraftData } from "./data/aircraft";
import { airportData } from "./data/airports";

// Get the acceleration rate (f/s^2) at a certain thrust (0-100)
function getAccelerationRate(accData: LinearData, thrust: number) {
    return KTS_TO_FPS * (accData.slope * (thrust * 0.01) + accData.base);
}

// Get the speed (kts) at a certain thrust level
function getMaxSpeed(VmaxData: QuadraticData, thrust: number) {
    return (
        VmaxData.quadratic * (thrust * 0.01) * (thrust * 0.01) +
        VmaxData.linear * (thrust * 0.01) +
        VmaxData.base
    );
}

function getClosestThrust(Vmaxdata: QuadraticData, speed: number) {
    let minimumDifference = speed;
    let closestThrust = 0;
    for (let thrust = 1; thrust < 100; thrust++) {
        const maxSpeed = getMaxSpeed(Vmaxdata, thrust);
        const candidateDifference = Math.abs(maxSpeed - speed);
        if (candidateDifference < minimumDifference) {
            minimumDifference = candidateDifference;
            closestThrust = thrust;
        }
    }
    return closestThrust;
}

// Get the thrust required to reach at least the speed (kts) provided
function getMinimumThrust(VmaxData: QuadraticData, speed: number) {
    for (let thrust = 1; thrust < 100; thrust++) {
        if (getMaxSpeed(VmaxData, thrust) > speed) {
            return thrust;
        }
    }
    return -1;
}

function getFlapReduction(aircraftData: AircraftData, setting: number) {
    return (
        aircraftData.flaps.find((flap) => flap.setting === setting)
            ?.reduction || 0
    );
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

/**
 * Get deceleration rate in feet/second^2
 */
function getDecelerationRate(aircraftData: AircraftData, id: string) {
    const deceleration = aircraftData.deceleration;
    const rate_kts =
        (id === "idle-rev" && deceleration.idleReversers) ||
        (id === "max-rev" && deceleration.maxReversers) ||
        deceleration.noReversers;
    return rate_kts * KTS_TO_FPS;
}

export {
    getAccelerationRate,
    getMaxSpeed,
    getClosestThrust,
    getMinimumThrust,
    getFlapReduction,
    getAircraftData,
    getAirportData,
    getRunwayData,
    getDecelerationRate,
};

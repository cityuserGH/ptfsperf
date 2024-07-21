type AircraftData = {
    type: string;
    flaps: { setting: number; reduction: number }[];
    speeds: {
        rotate: number;
        landing: number;
        stall: number;
        max: number;
    };
    decleration: {
        value: string;
        name: string;
        rate: number;
    }[];
    accelerationData: LinearData;
    speedData: QuadraticData;
};

type LinearData = {
    base: number;
    slope: number;
};

type QuadraticData = {
    base: number;
    linear: number;
    quadratic: number;
};

type AirportData = {
    name: string;
    icao: string;
    runways: RunwayData[];
};

type RunwayData = {
    name: string;
    heading: number;
    lda: number;
    tora: number;
    asda: number;
    intersections: {
        name: string;
        shift: number;
    }[];
};

export { AircraftData, AirportData, RunwayData, QuadraticData, LinearData };

type AircraftData = {
    type: string;
    flaps: { name?: string; setting: number; reduction: number }[];
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

type FormInformation = {
    submitText: string;
    callback: (answers: { [id: number]: string }) => void;
    questions: FormQuestion[];
};

type FormQuestion = {
    id: number;
    question: string;
    required: boolean;
    default: string;
    dependsOn?: number[];
    options?: { value: string; text: string }[];
    optionCallback?: (values: string[]) => { value: string; text: string }[];
};

export {
    AircraftData,
    AirportData,
    RunwayData,
    QuadraticData,
    LinearData,
    FormInformation,
    FormQuestion,
};

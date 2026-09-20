type AircraftData = {
    type: string;
    flaps: { name?: string; setting: number }[];
    speeds: {
        max: number;
        transition: number;
        stall: number;
    };
    maxFlapReduction: number;
    acceleration: number;
    hasReversers: boolean;
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
    FormInformation,
    FormQuestion,
};

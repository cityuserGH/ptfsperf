
/**
 * Defines the performance and configuration data for an aircraft.
 */
type AircraftData = {
    /** Aircraft type identifier used to look up its performance data. */
    type: string;

    /** Total number of available flap settings. */
    numFlaps: number;

    /**
     * Optional custom names and corresponding settings for the aircraft's flaps.
     * Useful when the aircraft uses named flap configurations.
     */
    customFlapNames?: {
        /** Display name of the flap configuration. */
        name: string;

        /** Numeric setting associated with this flap configuration. */
        setting: number;
    }[];

    /** Reference speeds used by the aircraft performance model, in knots. */
    speeds: {
        /** Maximum aircraft speed used by the performance calculations, in knots. */
        max: number;

        /** Transition speed used by the performance calculations, in knots. */
        transition: number;
    };

    /** Aircraft acceleration parameter used by the performance model. */
    acceleration: number;

    /** Whether the aircraft is equipped with reverse thrust. */
    hasReversers: boolean;
};

/**
 * Defines an airport and its available runways.
 */
type AirportData = {
    /** Airport's display name. */
    name: string;

    /** Airport's ICAO identifier. */
    icao: string;

    /** Runways available for performance calculations at this airport. */
    runways: RunwayData[];
};

/**
 * Defines the runway distances, heading and available intersections
 * used by the performance calculator.
 */
type RunwayData = {
    /** Runway identifier, such as "09" or "27L". */
    name: string;

    /** Runway heading in degrees, from 0° to 359°. */
    heading: number;

    /** Landing Distance Available (LDA), in the distance unit used by the runway data. */
    lda: number;

    /** Take-Off Run Available (TORA), in the distance unit used by the runway data. */
    tora: number;

    /** Accelerate-Stop Distance Available (ASDA), in the distance unit used by the runway data. */
    asda: number;

    /** Available runway intersections and their distance offsets. */
    intersections: {
        /** Intersection identifier used by the calculator. */
        name: string;

        /** Distance deducted from the available runway distances when using this intersection. */
        shift: number;
    }[];
};

/**
 * Defines the configuration and behaviour of a form.
 */
type FormInformation = {
    /** Text displayed on the form's submit button. */
    submitText: string;

    /**
     * Function executed when the form is submitted.
     * Receives the answers indexed by question ID.
     */
    callback: (answers: { [id: number]: string }) => void;

    /** Questions displayed by the form, in their configured order. */
    questions: FormQuestion[];
};

/**
 * Defines a question displayed in a calculator form.
 */
type FormQuestion = {
    /** Unique identifier used to reference this question. */
    id: number;

    /** Question text displayed to the user. */
    question: string;

    /** Whether the user must provide an answer before submitting. */
    required: boolean;

    /** Default value used when initializing the question. */
    default: string;

    /**
     * IDs of questions that this question depends on.
     * Used to control when this question or its options are relevant.
     */
    dependsOn?: number[];

    /** Static options available when the question uses a selection input. */
    options?: {
        /** Value stored in the form submission. */
        value: string;

        /** Label displayed to the user. */
        text: string;
    }[];

    /**
     * Optional function that dynamically generates the question's options.
     * Receives the relevant values as strings and returns the available options.
     */
    optionCallback?: (
        values: string[]
    ) => {
        /** Value stored in the form submission. */
        value: string;

        /** Label displayed to the user. */
        text: string;
    }[];
};

/**
 * Defines the wind components relative to the selected runway.
 */
type WindComponents = {
    /**
     * Longitudinal wind component in knots.
     * Positive values indicate headwind; negative values indicate tailwind.
     */
    headwind: number;

    /** Signed crosswind component in knots, relative to the runway heading. */
    crosswind: number;
};

export {
    AircraftData,
    AirportData,
    RunwayData,
    FormInformation,
    FormQuestion,
    WindComponents,
};

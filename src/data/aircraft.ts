import { AircraftData } from "../types";

const aircraftData: AircraftData[] = [
    {
        type: "Airbus A220",
        flaps: [
            {
                setting: 1
            },
            {
                setting: 2
            },
            {
                setting: 3
            },
            {
                name: "Flaps FULL",
                setting: 4
            },
        ],
        speeds: {
            max: 470,
            transition: 160,
            stall: 136
        },
        maxFlapReduction: 27,
        acceleration: 10,
        hasReversers: true,
    },
];

export { aircraftData };

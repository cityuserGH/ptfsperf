import { AircraftData } from "../types";

const aircraftData: AircraftData[] = [
    {
        type: "Airbus A220",
        numFlaps: 4,
        customFlapNames: [
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
    {
        type: "Airbus A320",
        numFlaps: 4,
        speeds: {
            max: 447,
            transition: 167,
            stall: 141
        },
        maxFlapReduction: 28,
        acceleration: 10,
        hasReversers: true,
    },
    {
        type: "Airbus A330",
        numFlaps: 4,
        speeds: {
            max: 475,
            transition: 170,
            stall: 144,
        },
        maxFlapReduction: 29,
        acceleration: 9.5,
        hasReversers: true,
    },
    {
        type: "Airbus A350",
        numFlaps: 3,
        speeds: {
            max: 487,
            transition: 175,
            stall: 148,
        },
        maxFlapReduction: 30,
        acceleration: 10,
        hasReversers: true,
    },
    {
        type: "Boeing 737",
        numFlaps: 5,
        speeds: {
            max: 454,
            transition: 165,
            stall: 140,
        },
        maxFlapReduction: 28,
        acceleration: 10,
        hasReversers: true,
    },
    {
        type: "Boeing 757",
        numFlaps: 5,
        speeds: {
            max: 458,
            transition: 165,
            stall: 140,
        },
        maxFlapReduction: 28,
        acceleration: 9.5,
        hasReversers: true,
    },
    {
        type: "Boeing 767",
        numFlaps: 4,
        speeds: {
            max: 458,
            transition: 165,
            stall: 140,
        },
        maxFlapReduction: 28,
        acceleration: 9.5,
        hasReversers: true,
    },
    {
        type: "Boeing 777",
        numFlaps: 5,
        speeds: {
            max: 518,
            transition: 180,
            stall: 153,
        },
        maxFlapReduction: 31,
        acceleration: 9.5,
        hasReversers: true,
    },
    {
        type: "Boeing 787",
        numFlaps: 5,
        speeds: {
            max: 487,
            transition: 175,
            stall: 148,
        },
        maxFlapReduction: 30,
        acceleration: 9.5,
        hasReversers: true,
    },
    {
        type: "Bombardier CRJ700",
        numFlaps: 3,
        speeds: {
            max: 447,
            transition: 155,
            stall: 131,
        },
        maxFlapReduction: 26,
        acceleration: 10,
        hasReversers: true,
    },
    {
        type: "Embraer E190",
        numFlaps: 3,
        speeds: {
            max: 470,
            transition: 161,
            stall: 136,
        },
        maxFlapReduction: 27,
        acceleration: 10,
        hasReversers: true,
    },
    {
        type: "Airbus A340",
        numFlaps: 4,
        speeds: {
            max: 470,
            transition: 175,
            stall: 148,
        },
        maxFlapReduction: 30,
        acceleration: 9.5,
        hasReversers: true,
    },
    {
        type: "Airbus A380",
        numFlaps: 4,
        speeds: {
            max: 566,
            transition: 175,
            stall: 148,
        },
        maxFlapReduction: 30,
        acceleration: 9.5,
        hasReversers: true,
    },
    {
        type: "Boeing 747",
        numFlaps: 5,
        speeds: {
            max: 495,
            transition: 175,
            stall: 148,
        },
        maxFlapReduction: 30,
        acceleration: 9.5,
        hasReversers: true,
    },
    {
        type: "Concorde",
        numFlaps: 0,
        speeds: {
            max: 1165,
            transition: 190,
            stall: 160,
        },
        acceleration: 12,
        hasReversers: true,
    }
];

export { aircraftData };

import { AircraftData } from "../types";

const aircraftData: AircraftData[] = [
    {
        type: "A320",
        flaps: [
            {
                setting: 1,
                reduction: 6,
            },
            {
                setting: 2,
                reduction: 11,
            },
            {
                setting: 3,
                reduction: 17,
            },
            {
                setting: 4,
                reduction: 22,
            },
        ],
        speeds: {
            rotate: 159,
            landing: 157,
            stall: 110,
            max: 447,
        },
        accelerationData: {
            slope: 5.62,
            base: 4.38,
        },
        decleration: [
            { name: "Idle", value: "no-rev", rate: 6.3 },
            { name: "Idle reverse", value: "idle-rev", rate: 6.72 },
            { name: "Max reverse", value: "max-rev", rate: 11.2 },
        ],
        speedData: {
            base: -8.44,
            linear: 99,
            quadratic: 365,
        },
    },
    {
        type: "A330",
        flaps: [
            {
                setting: 1,
                reduction: 11,
            },
            {
                setting: 2,
                reduction: 22,
            },
        ],
        speeds: {
            rotate: 159,
            landing: 157,
            stall: 110,
            max: 475,
        },
        decleration: [
            { name: "No reversers", value: "no-rev", rate: 5.98 },
            { name: "Idle reverse", value: "idle-rev", rate: 6.39 },
            { name: "Max reverse", value: "max-rev", rate: 10.6 },
        ],
        accelerationData: {
            base: 5.36,
            slope: 4.13,
        },
        speedData: {
            base: -6.91,
            linear: 96,
            quadratic: 393,
        },
    },
    {
        type: "A380",
        flaps: [
            { setting: 1, reduction: 6 },
            { setting: 2, reduction: 11 },
            { setting: 3, reduction: 18 },
            { setting: 4, reduction: 22 },
        ],
        speeds: {
            rotate: 170,
            landing: 167,
            stall: 117,
            max: 566,
        },
        decleration: [
            {
                name: "No reversers",
                value: "no-rev",
                rate: 6.18,
            },
            {
                name: "Idle reversers",
                value: "idle-rev",
                rate: 6.6,
            },
            {
                name: "Max reversers",
                value: "max-rev",
                rate: 10.9,
            },
        ],
        accelerationData: {
            base: 4.7,
            slope: 4.69,
        },
        speedData: {
            base: -8.67,
            linear: 114,
            quadratic: 471,
        },
    },
];

export { aircraftData };

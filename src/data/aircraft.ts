import { AircraftData } from "../types";

const aircraftData: AircraftData[] = [
    {
        type: "Airbus A320",
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
                name: "Flaps FULL",
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
        type: "Airbus A330",
        flaps: [
            {
                setting: 1,
                reduction: 11,
            },
            {
                name: "Flaps FULL",
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
        type: "Airbus A380",
        flaps: [
            { setting: 1, reduction: 6 },
            { setting: 2, reduction: 11 },
            { setting: 3, reduction: 18 },
            { name: "Flaps FULL", setting: 4, reduction: 22 },
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
    {
        type: "Boeing 737",
        flaps: [
            {
                setting: 1,
                reduction: 4,
            },
            {
                setting: 2,
                reduction: 9,
            },
            {
                setting: 3,
                reduction: 13,
            },
            {
                setting: 4,
                reduction: 18,
            },
            {
                setting: 5,
                reduction: 22,
            },
        ],
        speeds: {
            rotate: 152,
            landing: 149,
            stall: 110,
            max: 454,
        },
        decleration: [
            {
                value: "no-rev",
                name: "No reversers",
                rate: 6.29,
            },
            {
                value: "idle-rev",
                name: "Idle reversers",
                rate: 6.73,
            },
            {
                value: "max-rev",
                name: "Max reversers",
                rate: 11.2,
            },
        ],
        accelerationData: {
            base: 4.36,
            slope: 5.6,
        },
        speedData: {
            base: -6.65,
            linear: 92.5,
            quadratic: 374,
        },
    },
    {
        type: "Boeing 777",
        flaps: [
            {
                setting: 1,
                reduction: 12,
            },
            {
                setting: 2,
                reduction: 24,
            },
        ],
        speeds: {
            rotate: 162,
            landing: 159,
            stall: 120,
            max: 518,
        },
        decleration: [
            {
                value: "no-rev",
                name: "No reversers",
                rate: 5.99,
            },
            {
                value: "idle-rev",
                name: "Idle reversers",
                rate: 6.38,
            },
            {
                value: "max-rev",
                name: "Max reversers",
                rate: 10.6,
            },
        ],
        accelerationData: {
            base: 4.16,
            slope: 5.34,
        },
        speedData: {
            base: -8.26,
            linear: 110,
            quadratic: 424,
        },
    },
];

export { aircraftData };

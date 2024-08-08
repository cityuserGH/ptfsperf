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
            slope: 4.38,
            base: 5.62,
        },
        deceleration: {
            noReversers: -6.3,
            idleReversers: -6.72,
            maxReversers: -11.2,
        },
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
        deceleration: {
            noReversers: -5.98,
            idleReversers: -6.39,
            maxReversers: -10.6,
        },
        accelerationData: {
            base: 4.13,
            slope: 5.36,
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
        deceleration: {
            noReversers: -6.18,
            idleReversers: -6.6,
            maxReversers: -10.9,
        },
        accelerationData: {
            base: 4.69,
            slope: 4.7,
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
        deceleration: {
            noReversers: -6.29,
            idleReversers: -6.73,
            maxReversers: -11.2,
        },
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
        deceleration: {
            noReversers: -5.99,
            idleReversers: -6.38,
            maxReversers: -10.6,
        },
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
    {
        type: "Boeing 787",
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
            max: 487,
        },
        deceleration: {
            noReversers: -5.99,
            idleReversers: -6.39,
            maxReversers: -10.6,
        },
        accelerationData: {
            base: 4.11,
            slope: 5.4,
        },
        speedData: {
            base: -7.46,
            linear: 102,
            quadratic: 401,
        },
    },
    {
        type: "Boeing 747",
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
            rotate: 151,
            landing: 149,
            stall: 110,
            max: 495,
        },
        deceleration: {
            noReversers: -5.92,
            idleReversers: -6.34,
            maxReversers: -10.6,
        },
        accelerationData: {
            base: 4.18,
            slope: 5.3,
        },
        speedData: {
            base: -7.5,
            linear: 104,
            quadratic: 407,
        },
    },
    {
        type: "Airbus A350",
        flaps: [
            {
                setting: 1,
                reduction: 12,
            },
            {
                setting: 2,
                reduction: 23,
            },
        ],
        speeds: {
            rotate: 169,
            landing: 167,
            stall: 117,
            max: 487,
        },
        deceleration: {
            noReversers: -6.72,
            idleReversers: -6.72,
            maxReversers: -11.2,
        },
        accelerationData: {
            base: 4.41,
            slope: 5.5,
        },
        speedData: {
            base: -6.87,
            linear: 96,
            quadratic: 405,
        },
    },
    {
        type: "ATR-72",
        flaps: [
            {
                setting: 1,
                reduction: 12,
            },
            {
                setting: 2,
                reduction: 23,
            },
        ],
        speeds: {
            rotate: 137,
            landing: 134,
            stall: 115,
            max: 276,
        },
        deceleration: {
            noReversers: -5.98,
            idleReversers: -6.39,
            maxReversers: -10.7,
        },
        accelerationData: {
            base: 4.17,
            slope: 5.28,
        },
        speedData: {
            base: -4.41,
            linear: 56.8,
            quadratic: 228,
        },
    },
    {
        type: "Airbus A220",
        flaps: [
            {
                setting: 1,
                reduction: 5,
            },
            {
                setting: 2,
                reduction: 11,
            },
            {
                setting: 3,
                reduction: 16,
            },
            {
                setting: 4,
                reduction: 21,
            },
        ],
        speeds: {
            rotate: 147,
            landing: 144,
            stall: 105,
            max: 470,
        },
        deceleration: {
            noReversers: -6.29,
            idleReversers: -6.71,
            maxReversers: -11.2,
        },
        accelerationData: {
            base: 4.38,
            slope: 5.62,
        },
        speedData: {
            base: -7.13,
            linear: 103,
            quadratic: 380,
        },
    },
];

export { aircraftData };

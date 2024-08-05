import { AirportData } from "../types";

const airportData: AirportData[] = [
    {
        name: "Mellor",
        icao: "IMLR",
        runways: [
            {
                name: "07",
                heading: 66,
                lda: 5325,
                tora: 5325,
                asda: 5325,
                intersections: [
                    {
                        name: "A2",
                        shift: 0,
                    },
                    {
                        name: "C",
                        shift: 3222,
                    },
                    {
                        name: "B",
                        shift: 4089,
                    },
                ],
            },
            {
                name: "25",
                heading: 246,
                lda: 5325,
                tora: 5325,
                asda: 5325,
                intersections: [
                    {
                        name: "A1",
                        shift: 0,
                    },
                    {
                        name: "B",
                        shift: 1236,
                    },
                    {
                        name: "C",
                        shift: 2103,
                    },
                ],
            },
        ],
    },
    {
        name: "Larnaca",
        icao: "ILAR",
        runways: [
            {
                name: "24",
                heading: 244,
                lda: 5818,
                tora: 5818,
                asda: 6179,
                intersections: [
                    {
                        name: "C1/D1",
                        shift: 0,
                    },
                    {
                        name: "D2",
                        shift: 1869,
                    },
                    {
                        name: "D3/D4",
                        shift: 3082,
                    },
                    {
                        name: "D5",
                        shift: 3787,
                    },
                    /*
                    {
                        name: "D6",
                        shift: 4856,
                    },
                     */
                ],
            },
            {
                name: "06",
                heading: 64,
                lda: 5682,
                tora: 5818,
                asda: 5929,
                intersections: [
                    {
                        name: "D7",
                        shift: 0,
                    },
                    {
                        name: "D2",
                        shift: 3949,
                    },
                    {
                        name: "D3/D4",
                        shift: 2736,
                    },
                    {
                        name: "D5",
                        shift: 2031,
                    },
                    {
                        name: "D6",
                        shift: 962,
                    },
                ],
            },
        ],
    },
    {
        name: "Izolirani",
        icao: "IZOL",
        runways: [
            {
                name: "28",
                heading: 286,
                lda: 7389,
                tora: 8155,
                asda: 8292,
                intersections: [
                    {
                        name: "E1",
                        shift: 766,
                    },
                    {
                        name: "E2",
                        shift: 2608,
                    },
                    {
                        name: "E4",
                        shift: 4447,
                    },
                ],
            },
            {
                name: "10",
                heading: 106,
                lda: 7389,
                tora: 7389,
                asda: 8155,
                intersections: [
                    { name: "E7", shift: 0 },
                    {
                        name: "E6",
                        shift: 398,
                    },
                    {
                        name: "E5",
                        shift: 3708,
                    },
                    {
                        name: "E3",
                        shift: 5548,
                    },
                ],
            },
        ],
    },
    {
        name: "Perth",
        icao: "IPPH",
        runways: [
            {
                name: "33",
                heading: 331,
                lda: 5575,
                tora: 5575,
                asda: 5875,
                intersections: [
                    {
                        name: "E",
                        shift: 0,
                    },
                    {
                        name: "D2/A2/A",
                        shift: 1128,
                    },
                    {
                        name: "C",
                        shift: 3541,
                    },
                ],
            },
            {
                name: "15",
                heading: 151,
                lda: 5575,
                tora: 5875,
                asda: 5986,
                intersections: [
                    {
                        name: "B",
                        shift: 300,
                    },
                    {
                        name: "C",
                        shift: 2335,
                    },
                ],
            },
            {
                name: "11",
                heading: 111,
                lda: 7397,
                tora: 7397,
                asda: 7823,
                intersections: [
                    {
                        name: "B",
                        shift: 0,
                    },
                    {
                        name: "A1/C1",
                        shift: 1751,
                    },
                    {
                        name: "A2/C2",
                        shift: 3737,
                    },
                ],
            },
            {
                name: "29",
                heading: 291,
                lda: 7397,
                tora: 7397,
                asda: 7523,
                intersections: [
                    {
                        name: "A5/C5",
                        shift: 0,
                    },
                    {
                        name: "A4/C4",
                        shift: 1309,
                    },
                    {
                        name: "A3/C3",
                        shift: 2397,
                    },
                ],
            },
        ],
    },
    {
        name: "Tokyo",
        icao: "ITKO",
        runways: [
            {
                name: "20",
                heading: 200,
                lda: 6508,
                tora: 6508,
                asda: 6691,
                intersections: [
                    {
                        name: "D5",
                        shift: 0,
                    },
                    {
                        name: "D4",
                        shift: 1231,
                    },
                ],
            },
            {
                name: "02",
                heading: 20,
                lda: 6508,
                tora: 6508,
                asda: 6682,
                intersections: [
                    {
                        name: "D1",
                        shift: 248,
                    },
                    {
                        name: "D2",
                        shift: 1630,
                    },
                    {
                        name: "D3",
                        shift: 2512,
                    },
                ],
            },
            {
                name: "13",
                heading: 127,
                lda: 7227,
                tora: 8092,
                asda: 8278,
                intersections: [
                    {
                        name: "B13",
                        shift: 0,
                    },
                    {
                        name: "B12S",
                        shift: 865,
                    },
                    {
                        name: "B12",
                        shift: 1544,
                    },
                    {
                        name: "B11",
                        shift: 2745,
                    },
                    {
                        name: "B10",
                        shift: 3500,
                    },
                ],
            },
            {
                name: "31",
                heading: 307,
                lda: 7219,
                tora: 8092,
                asda: 8274,
                intersections: [
                    {
                        name: "B1",
                        shift: 0,
                    },
                    {
                        name: "B2",
                        shift: 873,
                    },
                    {
                        name: "B3",
                        shift: 1155,
                    },
                    {
                        name: "B4",
                        shift: 2123,
                    },
                    {
                        name: "B6",
                        shift: 2168,
                    },
                    {
                        name: "B6S",
                        shift: 2705,
                    },
                    {
                        name: "B7",
                        shift: 3558,
                    },
                    {
                        name: "B8",
                        shift: 4592,
                    },
                ],
            },
        ],
    },
    {
        name: "Grindavik",
        icao: "IGRV",
        runways: [
            {
                name: "06",
                heading: 62,
                lda: 4061,
                tora: 4061,
                asda: 4182,
                intersections: [
                    {
                        name: "A1",
                        shift: 0,
                    },
                    {
                        name: "A2/B2",
                        shift: 1424,
                    },
                ],
            },
            {
                name: "24",
                heading: 242,
                lda: 4061,
                tora: 4061,
                asda: 4172,
                intersections: [
                    {
                        name: "A3",
                        shift: 0,
                    },
                    {
                        name: "A2/B2",
                        shift: 2637,
                    },
                ],
            },
        ],
    },
    {
        name: "Sauthemptona",
        icao: "ISAU",
        runways: [
            {
                name: "26",
                heading: 261,
                lda: 4171,
                tora: 4290,
                asda: 4290,
                intersections: [
                    {
                        name: "A1",
                        shift: 430,
                    },
                    {
                        name: "A2",
                        shift: 2410,
                    },
                ],
            },
            {
                name: "08",
                heading: 81,
                lda: 4170,
                tora: 4290,
                asda: 4382,
                intersections: [
                    {
                        name: "A2",
                        shift: 1879,
                    },
                ],
            },
        ],
    },
    {
        name: "Saint Barthélemy",
        icao: "IBTH",
        runways: [
            {
                name: "27",
                heading: 270,
                lda: 2612,
                tora: 2612,
                asda: 2612,
                intersections: [
                    {
                        name: "C",
                        shift: 1228,
                    },
                ],
            },
            {
                name: "09",
                heading: 90,
                lda: 2612,
                tora: 2612,
                asda: 2612,
                intersections: [
                    {
                        name: "A",
                        shift: 0,
                    },
                    {
                        name: "B",
                        shift: 538,
                    },
                    {
                        name: "C",
                        shift: 1383,
                    },
                ],
            },
        ],
    },
    {
        name: "Lukla",
        icao: "ILKL",
        runways: [
            {
                name: "09",
                heading: 89,
                lda: 0,
                tora: 2157,
                asda: 2157,
                intersections: [
                    {
                        name: "A",
                        shift: 86,
                    },
                    {
                        name: "B",
                        shift: 697,
                    },
                ],
            },
            {
                name: "27",
                heading: 269,
                lda: 2157,
                tora: 0,
                asda: 0,
                intersections: [],
            },
        ],
    },
    {
        name: "Greater Rockford",
        icao: "IRFD",
        runways: [
            {
                name: "25L",
                heading: 247,
                lda: 5630,
                tora: 6731,
                asda: 6922,
                intersections: [
                    {
                        name: "A5",
                        shift: 0,
                    },
                    {
                        name: "A4",
                        shift: 768,
                    },
                    {
                        name: "A3",
                        shift: 1437,
                    },
                    {
                        name: "A3S",
                        shift: 2125,
                    },
                    {
                        name: "F",
                        shift: 3364,
                    },
                    {
                        name: "E",
                        shift: 4066,
                    },
                ],
            },
            {
                name: "07R",
                heading: 67,
                lda: 6207,
                tora: 6731,
                asda: 6731,
                intersections: [
                    {
                        name: "A1",
                        shift: 0,
                    },
                    {
                        name: "A2",
                        shift: 1058,
                    },
                    {
                        name: "C",
                        shift: 1692,
                    },
                    {
                        name: "D/G",
                        shift: 1833,
                    },
                    {
                        name: "E",
                        shift: 2664,
                    },
                    {
                        name: "F",
                        shift: 3366,
                    },
                ],
            },
            {
                name: "07C",
                heading: 67,
                lda: 5894,
                tora: 6246,
                asda: 6246,
                intersections: [
                    {
                        name: "G1",
                        shift: 0,
                    },
                    {
                        name: "G2",
                        shift: 1320,
                    },
                    {
                        name: "G3",
                        shift: 2205,
                    },
                ],
            },
            {
                name: "25C",
                heading: 247,
                lda: 6246,
                tora: 6246,
                asda: 6246,
                intersections: [
                    {
                        name: "M2",
                        shift: 0,
                    },
                    {
                        name: "M1",
                        shift: 809,
                    },
                ],
            },
            {
                name: "25R",
                heading: 247,
                lda: 5397,
                tora: 5793,
                asda: 5793,
                intersections: [
                    {
                        name: "H",
                        shift: 0,
                    },
                    {
                        name: "E1",
                        shift: 3875,
                    },
                ],
            },
            {
                name: "07L",
                heading: 67,
                lda: 5584,
                tora: 5793,
                asda: 5984,
                intersections: [
                    {
                        name: "B1",
                        shift: 209,
                    },
                    {
                        name: "B2",
                        shift: 1564,
                    },
                    {
                        name: "E2",
                        shift: 3680,
                    },
                ],
            },
        ],
    },
    {
        name: "Al Najaf",
        icao: "IJAF",
        runways: [
            {
                name: "07",
                heading: 71,
                lda: 3884,
                tora: 3884,
                asda: 3884,
                intersections: [],
            },
            {
                name: "25",
                heading: 251,
                lda: 3884,
                tora: 3884,
                asda: 3884,
                intersections: [],
            },
        ],
    },
    {
        name: "Paphos",
        icao: "IPAP",
        runways: [
            {
                name: "17",
                heading: 174,
                lda: 5802,
                tora: 5802,
                asda: 5960,
                intersections: [
                    {
                        name: "C4",
                        shift: 0,
                    },
                    {
                        name: "C3",
                        shift: 1025,
                    },
                    {
                        name: "B2",
                        shift: 1494,
                    },
                    {
                        name: "B1/C2",
                        shift: 2893,
                    },
                ],
            },
            {
                name: "35",
                heading: 354,
                lda: 5802,
                tora: 5802,
                asda: 5956,
                intersections: [
                    {
                        name: "C1",
                        shift: 0,
                    },
                    {
                        name: "B1/C2",
                        shift: 2909,
                    },
                    {
                        name: "B2",
                        shift: 4309,
                    },
                ],
            },
        ],
    },
    {
        name: "McConnell AFB",
        icao: "IIAB",
        runways: [
            {
                name: "27L",
                heading: 275,
                lda: 7371,
                tora: 7371,
                asda: 8048,
                intersections: [
                    {
                        name: "L2",
                        shift: 0,
                    },
                    {
                        name: "J2",
                        shift: 2384,
                    },
                    {
                        name: "I2",
                        shift: 4947,
                    },
                ],
            },
            {
                name: "09R",
                heading: 95,
                lda: 7371,
                tora: 7371,
                asda: 8039,
                intersections: [
                    {
                        name: "D2",
                        shift: 0,
                    },
                    {
                        name: "I2",
                        shift: 2424,
                    },
                    {
                        name: "J2",
                        shift: 4988,
                    },
                ],
            },
            {
                name: "09L",
                heading: 95,
                lda: 7346,
                tora: 7346,
                asda: 8016,
                intersections: [
                    {
                        name: "D1/D2",
                        shift: 0,
                    },
                    {
                        name: "I1/I2",
                        shift: 2743,
                    },
                    {
                        name: "J1/J2",
                        shift: 4545,
                    },
                ],
            },
            {
                name: "27R",
                heading: 275,
                lda: 7346,
                tora: 7346,
                asda: 8016,
                intersections: [
                    {
                        name: "L1/L2",
                        shift: 0,
                    },
                    {
                        name: "J1/J2",
                        shift: 2801,
                    },
                    {
                        name: "I1/I2",
                        shift: 4603,
                    },
                ],
            },
        ],
    },
];

export { airportData };

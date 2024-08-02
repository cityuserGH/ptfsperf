import { calculateLandingPerformance } from "../landing";
import { calculateTakeoffPerformance } from "../takeoff";
import { FormInformation } from "../types";
import { getAircraftData, getAirportData } from "../utils";
import { aircraftData } from "./aircraft";
import { airportData } from "./airports";

const questionBank = {
    aircraft: {
        question: "Aircraft",
        required: true,
        default: "-- Select Aircraft --",
        options: aircraftData.map((acft) => {
            return {
                text: acft.type,
                value: acft.type,
            };
        }),
    },
    airport: {
        question: "Airport",
        required: true,
        default: "-- Select Airport --",
        options: airportData
            .sort((a, b) => (a.name > b.name ? 1 : -1))
            .map((apt) => {
                return {
                    text: apt.name + " (" + apt.icao + ")",
                    value: apt.icao,
                };
            }),
    },
    flaps: {
        id: 3,
        question: "Flaps",
        required: false,
        default: "-- Select Flaps --",
        dependsOn: [0],
        optionCallback: ([type]: string[]) => {
            const acft = getAircraftData(type);
            if (!acft) return [];
            const maxFlaps = Math.max(
                ...acft.flaps.map((flap) => flap.setting)
            ).toString();
            const flaps = acft?.flaps
                .sort((a, b) => (a.setting > b.setting ? 1 : -1))
                .map((flaps) => {
                    const name = flaps.name;
                    const setting = flaps.setting.toString();
                    const configuration = setting + "/" + maxFlaps;

                    return {
                        text: name
                            ? name + " (" + configuration + ")"
                            : "Flaps " + configuration,
                        value: setting,
                    };
                });

            return flaps;
        },
    },
};

const takeoffFormInfo: FormInformation = {
    submitText: "Calculate!",
    callback: (options) => {
        const spanIds = ["to-results", "v1", "vr", "v2", "to-thrust"];
        const spans: { [id: string]: HTMLSpanElement } = {};
        spanIds.forEach((id) => {
            const span = document.querySelector("#" + id) as HTMLSpanElement;
            spans[id] = span;
        });

        const [type, airport, runway, intersection, flaps] =
            Object.values(options);
        if (type && airport && runway) {
            const results = calculateTakeoffPerformance(
                type,
                airport,
                runway,
                intersection,
                parseInt(flaps)
            );
            if (results) {
                const { canLiftoff, canAccelStop, thrust, v1, vr, v2 } =
                    results;
                const takeoffPossible = canLiftoff && canAccelStop;

                const texts = takeoffPossible
                    ? ["Takeoff is possible.", v1, vr, v2, thrust].map((text) =>
                          text.toString()
                      )
                    : [
                          "Warning! Safe takeoff is not possible. Try using a higher flap setting or a longer runway.",
                          "???",
                          "???",
                          "???",
                          "???",
                      ];

                spanIds
                    .map((id) => spans[id])
                    .forEach((span, index) => {
                        span.textContent = texts[index];
                    });

                spans["to-results"].classList.remove("good", "error", "bad");
                spans["to-results"].classList.add(
                    takeoffPossible ? "good" : "bad"
                );

                // set all the numbers to ???
                /* 
            spanIds
                .slice(1)
                .map((id) => spans[id])
                .forEach((span) => {
                    span.textContent = "???";
                });
            */
            }
        } else {
            spans["to-results"].textContent =
                "Could not calculate takeoff performance.";
            spans["to-results"].classList.remove("good", "error", "bad");
            spans["to-results"].classList.add("error");
        }
    },
    questions: [
        questionBank.aircraft,
        questionBank.airport,
        {
            question: "Runway",
            required: true,
            default: "-- Select Runway --",
            dependsOn: [1],
            optionCallback: ([icao]: string[]) => {
                const airport = getAirportData(icao);
                const runways = airport?.runways
                    .sort((a, b) => (a.heading > b.heading ? 1 : -1))
                    .map((rwy) => {
                        return {
                            text: "RWY " + rwy.name + " (" + rwy.tora + " ft)",
                            value: rwy.name,
                        };
                    });
                if (!runways) return [];
                return runways;
            },
        },
        {
            question: "Intersection",
            required: false,
            default: "-- Select Intersection --",
            dependsOn: [1, 2],
            optionCallback: ([icao, rwy]: string[]) => {
                const runway = airportData
                    .find((airport) => airport.icao === icao)
                    ?.runways.find((runway) => runway.name === rwy);
                if (runway) {
                    const intersections = runway?.intersections.sort((a, b) =>
                        a.shift > b.shift ? 1 : -1
                    );
                    return intersections?.map((intersection) => {
                        return {
                            text:
                                "Intersection " +
                                intersection.name +
                                " (" +
                                (runway.tora - intersection.shift) +
                                " ft)",
                            value: intersection.name,
                        };
                    });
                } else {
                    return [];
                }
            },
        },
        { ...questionBank.flaps, dependsOn: [0] },
    ].map((element, index) => {
        return { ...element, id: index };
    }),
};

const landingFormInfo: FormInformation = {
    submitText: "Calculate!",
    callback: (options) => {
        const spanIds = [
            "ldg-results",
            "ald",
            "ldr",
            "lda",
            "ldg-margin",
            "vref",
            "vapp",
            "ldg-thrust",
        ];
        const spans: { [id: string]: HTMLSpanElement } = {};
        spanIds.forEach((id) => {
            const span = document.querySelector("#" + id) as HTMLSpanElement;
            spans[id] = span;
        });

        const [type, airport, runway, flaps, reversers] =
            Object.values(options);
        if (type && airport && runway) {
            const results = calculateLandingPerformance(
                type,
                airport,
                runway,
                parseInt(flaps),
                reversers
            );
            if (results) {
                const { thrust, canStop, ald, lda, ldr, margin, Vref, Vapp } =
                    results;

                const texts = [
                    canStop
                        ? "Landing is possible."
                        : "Warning! Safe landing is not possible. Try using reversers, a higher flap setting or a longer runway.",
                    ald,
                    ldr,
                    lda,
                    margin,
                    Vref,
                    Vapp,
                    thrust,
                ].map((text) => text.toString());
                spanIds
                    .map((id) => spans[id])
                    .forEach((span, index) => {
                        span.textContent = texts[index];
                    });

                spans["ldg-results"].classList.remove("good", "error", "bad");
                spans["ldg-results"].classList.add(canStop ? "good" : "bad");

                // set all the numbers to ???
                /* 
                spanIds
                    .slice(1)
                    .map((id) => spans[id])
                    .forEach((span) => {
                        span.textContent = "???";
                    });
                */
            }
        } else {
            spans["ldg-results"].textContent =
                "Could not calculate takeoff performance.";
            spans["ldg-results"].classList.remove("good", "error", "bad");
            spans["ldg-results"].classList.add("error");
        }
    },
    questions: [
        questionBank.aircraft,
        questionBank.airport,
        {
            question: "Runway",
            required: true,
            default: "-- Select Runway --",
            dependsOn: [1],
            optionCallback: ([icao]: string[]) => {
                const airport = getAirportData(icao);
                const runways = airport?.runways
                    .sort((a, b) => (a.heading > b.heading ? 1 : -1))
                    .map((rwy) => {
                        return {
                            text: "RWY " + rwy.name + " (" + rwy.lda + " ft)",
                            value: rwy.name,
                        };
                    });
                if (!runways) return [];
                return runways;
            },
        },
        { ...questionBank.flaps, dependsOn: [0] },
        {
            question: "Reversers",
            required: false,
            default: "-- Select Reversers --",
            dependsOn: [0],
            optionCallback: ([type]: string[]) => {
                const acft = getAircraftData(type);
                const decels = acft?.decleration
                    .sort((a, b) => (a.rate > b.rate ? 1 : -1))
                    .map((decel) => {
                        return {
                            text: decel.name,
                            value: decel.value,
                        };
                    });
                if (!decels) return [];
                return decels;
            },
        },
    ].map((element, index) => {
        return { ...element, id: index };
    }),
};

export { takeoffFormInfo, landingFormInfo };

import { REALISM_PRETEND_FACTOR } from "./data/values";
import { aircraftData } from "./data/aircraft";
import { airportData } from "./data/airports";
import { calculateTakeoffPerformance } from "./takeoff";
import { calculateLandingPerformance } from "./landing";
import { createForm } from "./form";
import { getAircraftData, getAirportData } from "./utils";

import "../public/style.css";

function clearValidOptions(select: HTMLSelectElement) {
    for (let index = select.length - 1; index >= 0; index--) {
        if (select.options[index].value) {
            select.remove(index);
        }
    }
}

function addOptionElement(
    selectTag: HTMLSelectElement,
    displayText: string,
    value: string
) {
    const option = document.createElement("option");
    option.text = displayText;
    option.value = value;
    selectTag.appendChild(option);
}

function checkRequiredInputs() {
    if (aircraftSelect.value && airportSelect.value && runwaySelect.value) {
        calculateButton.disabled = false;
    } else {
        calculateButton.disabled = true;
    }
}

function handleSelectAirport() {
    const targetIcao = airportSelect.value;
    // clear runways
    clearValidOptions(runwaySelect);
    clearValidOptions(intersectionSelect);
    if (targetIcao) {
        runwaySelect.disabled = false;
        // populate new runways
        airportData
            .find((airport) => airport.icao === targetIcao)
            ?.runways.sort((a, b) => a.heading - b.heading)
            .forEach((runway) => {
                const displayLength = Math.round(
                    runway.tora * REALISM_PRETEND_FACTOR
                ).toString();
                const displayText =
                    "RWY " + runway.name + " (" + displayLength + " ft)";
                addOptionElement(runwaySelect, displayText, runway.name);
            });
    } else {
        runwaySelect.disabled = true;
        intersectionSelect.disabled = true;
    }
}

function handleSelectRunway() {
    const currentAirportIcao = airportSelect.value;
    const targetRunway = runwaySelect.value;
    clearValidOptions(intersectionSelect);
    if (currentAirportIcao && targetRunway) {
        intersectionSelect.disabled = false;
        const runway = airportData
            .find((airport) => airport.icao === currentAirportIcao)
            ?.runways.find((runway) => runway.name === targetRunway);

        runway?.intersections
            .sort((a, b) => a.shift - b.shift)
            .forEach((intersection) => {
                const displayLength = Math.round(
                    (runway.tora - intersection.shift) * REALISM_PRETEND_FACTOR
                ).toString();
                const displayText =
                    (intersection.name === "Full length"
                        ? ""
                        : "Intersection ") +
                    intersection.name +
                    " (" +
                    displayLength +
                    " ft)";
                addOptionElement(
                    intersectionSelect,
                    displayText,
                    intersection.name
                );
            });
    } else {
        intersectionSelect.disabled = true;
    }
}

function handleSelectAircraft() {
    const aircraftType = aircraftSelect.value;
    clearValidOptions(flapSelect);
    if (aircraftType) {
        flapSelect.disabled = false;
        const typeData = aircraftData.find(
            (aircraft) => aircraft.type === aircraftType
        );
        typeData?.flaps.forEach((flap) => {
            const displayText = "Flaps " + flap.setting;
            addOptionElement(flapSelect, displayText, flap.setting.toString());
        });
    } else {
        flapSelect.disabled = true;
    }
}

function handleClickCalculate() {
    function setNumbersInvalid() {
        thrustSpan.textContent =
            v1Span.textContent =
            vrSpan.textContent =
            v2Span.textContent =
                "???";
    }

    const type = aircraftSelect.value;
    const airport = airportSelect.value;
    const runway = runwaySelect.value;
    const intersection = intersectionSelect.value;
    const flaps = parseInt(flapSelect.value);
    const performanceResults = calculateTakeoffPerformance(
        type,
        airport,
        runway,
        intersection,
        flaps
    );

    if (performanceResults) {
        const { canLiftoff, canAccelStop, data } = performanceResults;
        if (!canLiftoff || !canAccelStop) {
            resultsSpan.textContent =
                "Warning! Safe takeoff is not possible. Try a higher flap setting or a longer runway.";

            if (!canLiftoff) {
                resultsSpan.textContent += " Not enough distance to lift off.";
            }
            if (!canAccelStop) {
                resultsSpan.textContent +=
                    " Not enough distance to stop safely if takeoff is rejected.";
            }
            resultsSpan.classList.remove("good", "error", "bad");
            resultsSpan.classList.add("bad");
            setNumbersInvalid();
        } else {
            /*
            console.log(
                "Takeoff calculation for type",
                type,
                "at",
                airport,
                "RWY",
                runway,
                "intersection",
                intersection,
                "with flaps",
                flaps
            );
            console.log("V1:", data.v1);
            console.log("VR:", data.vr);
            console.log("V2:", data.v2);
            console.log("Thrust:", data.thrust);
            */
            resultsSpan.textContent = "Takeoff is possible.";
            resultsSpan.classList.remove("good", "error", "bad");
            resultsSpan.classList.add("good");

            thrustSpan.textContent = data.thrust.toString();
            v1Span.textContent = data.v1.toString();
            vrSpan.textContent = data.vr.toString();
            v2Span.textContent = data.v2.toString();
        }
    } else {
        resultsSpan.textContent = "Could not calculate takeoff performance.";
        resultsSpan.classList.remove("good", "error", "bad");
        resultsSpan.classList.add("bad");

        setNumbersInvalid();
    }
}

const aircraftSelect = document.getElementById(
    "aircraft-select"
) as HTMLSelectElement;

const airportSelect = document.getElementById(
    "airport-select"
) as HTMLSelectElement;

const runwaySelect = document.getElementById(
    "runway-select"
) as HTMLSelectElement;

const intersectionSelect = document.getElementById(
    "intersection-select"
) as HTMLSelectElement;

const flapSelect = document.getElementById("flaps-select") as HTMLSelectElement;

const resultsSpan = document.getElementById("results-span") as HTMLSpanElement;
const thrustSpan = document.getElementById("thrust") as HTMLSpanElement;
const v1Span = document.getElementById("v1") as HTMLSpanElement;
const vrSpan = document.getElementById("vr") as HTMLSpanElement;
const v2Span = document.getElementById("v2") as HTMLSpanElement;

// add aircraft
aircraftData.forEach((aircraft) => {
    const type = aircraft.type;
    const option = document.createElement("option");
    option.text = type;
    option.value = type;
    aircraftSelect?.appendChild(option);
});

// add airports
airportData.forEach((airport) => {
    const displayText = airport.name + " (" + airport.icao + ")";
    const option = document.createElement("option");
    option.text = displayText;
    option.value = airport.icao;
    airportSelect.appendChild(option);
});

// add listeners
aircraftSelect.addEventListener("input", handleSelectAircraft);
airportSelect.addEventListener("input", handleSelectAirport);
runwaySelect.addEventListener("input", handleSelectRunway);

aircraftSelect.addEventListener("input", checkRequiredInputs);
airportSelect.addEventListener("input", checkRequiredInputs);
runwaySelect.addEventListener("input", checkRequiredInputs);

// calculate!
const calculateButton = document.getElementById(
    "calculate-button"
) as HTMLButtonElement;
calculateButton.addEventListener("click", handleClickCalculate);

// try add landing

createForm("landing", "ldg-form", {
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

        /*
        const resultsSpan = document.querySelector(
            "#ldg-results"
        ) as HTMLSpanElement;
        const aldSpan = document.querySelector("#ald") as HTMLSpanElement;
        const ldrSpan = document.querySelector("#ldr") as HTMLSpanElement;
        const ldaSpan = document.querySelector("#lda") as HTMLSpanElement;
        const marginSpan = document.querySelector(
            "#ldg-margin"
        ) as HTMLSpanElement;
        const vrefSpan = document.querySelector("#vref") as HTMLSpanElement;
        const vappSpan = document.querySelector("#vapp") as HTMLSpanElement;
        const thrustSpan = document.querySelector(
            "#ldg-thrust"
        ) as HTMLSpanElement;
          */

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
        {
            id: 0,
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
        {
            id: 1,
            question: "Airport",
            required: true,
            default: "-- Select Airport --",
            options: airportData.map((apt) => {
                return {
                    text: apt.name + " (" + apt.icao + ")",
                    value: apt.icao,
                };
            }),
        },
        {
            id: 2,
            question: "Runway",
            required: true,
            default: "-- Select Runway --",
            dependsOn: 1,
            optionCallback: (icao) => {
                const airport = getAirportData(icao);
                const runways = airport?.runways.map((rwy) => {
                    return {
                        text: "Runway " + rwy.name + " (" + rwy.lda + " ft)",
                        value: rwy.name,
                    };
                });
                if (!runways) return [];
                return runways;
            },
        },
        {
            id: 3,
            question: "Flaps",
            required: false,
            default: "-- Select Flaps --",
            dependsOn: 0,
            optionCallback: (type) => {
                const acft = getAircraftData(type);
                const flaps = acft?.flaps.map((flaps) => {
                    const setting = flaps.setting.toString();
                    return {
                        text: "Flaps " + setting,
                        value: setting,
                    };
                });
                if (!flaps) return [];
                return flaps;
            },
        },
        {
            id: 4,
            question: "Reversers",
            required: false,
            default: "-- Select Reversers --",
            dependsOn: 0,
            optionCallback: (type) => {
                const acft = getAircraftData(type);
                const decels = acft?.decleration.map((decel) => {
                    return {
                        text: decel.name,
                        value: decel.value,
                    };
                });
                if (!decels) return [];
                return decels;
            },
        },
    ],
});

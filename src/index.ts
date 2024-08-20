import "../public/style.css";
import { createForm } from "./form";
import { landingFormInfo, takeoffFormInfo } from "./data/questions";

createForm("takeoff", "to-form", takeoffFormInfo);
createForm("landing", "ldg-form", landingFormInfo);

// Show/hide detailed information

const takeoffDetails = document.getElementById(
    "to-details-table"
) as HTMLFormElement;
const landingDetails = document.getElementById(
    "ldg-details-table"
) as HTMLFormElement;

const takeoffDetailsButton = document.getElementById(
    "to-details-button"
) as HTMLButtonElement;
const landingDetailsButton = document.getElementById(
    "ldg-details-button"
) as HTMLButtonElement;

takeoffDetailsButton.addEventListener("click", () => {
    takeoffDetails.hidden = !takeoffDetails.hidden;
    if (takeoffDetails.hidden) {
        takeoffDetailsButton.textContent = "Show detailed information";
    } else {
        takeoffDetailsButton.textContent = "Hide detailed information";
    }
});

landingDetailsButton.addEventListener("click", () => {
    landingDetails.hidden = !landingDetails.hidden;
    if (landingDetails.hidden) {
        landingDetailsButton.textContent = "Show detailed information";
    } else {
        landingDetailsButton.textContent = "Hide detailed information";
    }
});

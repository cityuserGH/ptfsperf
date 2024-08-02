import "../public/style.css";
import { createForm } from "./form";
import { landingFormInfo, takeoffFormInfo } from "./data/questions";

createForm("takeoff", "to-form", takeoffFormInfo);
createForm("landing", "ldg-form", landingFormInfo);

const KTS_TO_FPS = 1.68781;
const FPS_TO_KTS = 1 / KTS_TO_FPS;
const TORA_SAFETY_MARGIN = 1.2; // 20% extra takeoff distance
const CLIMBOUT_SPEED_LOSS = 10; // how much speed is lost due to pitch-up? bandage solution
const REALISM_PRETEND_FACTOR = 1; //0.563; // show user false runway lengths
const FLARE_DURATION = 7; // how many seconds the flare should be calculated as
const LDGDIST_SAFETY_MARGIN = 1.15;
const UNKNOWN_VALUE = "???";
const VREF_FACTOR = 1.3; // stall speed times this is vref

export {
    KTS_TO_FPS,
    FPS_TO_KTS,
    TORA_SAFETY_MARGIN,
    CLIMBOUT_SPEED_LOSS,
    REALISM_PRETEND_FACTOR,
    FLARE_DURATION,
    LDGDIST_SAFETY_MARGIN,
    VREF_FACTOR,
};

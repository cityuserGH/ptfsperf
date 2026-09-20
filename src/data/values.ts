const KTS_TO_FPS = 1.68781; // knots to feet per second
const FPS_TO_KTS = 1 / KTS_TO_FPS;
const TORA_SAFETY_MARGIN = 1.15; // 15% extra takeoff distance
const REALISM_PRETEND_FACTOR = 1; // 0.57 // show user false runway lengths, not implemented
const ROTATE_DURATION = 4.5; // seconds to rotate and reach 35 ft above runway
const FLARE_DURATION = 5; // seconds from threshold to throttle retardation
const LDGDIST_SAFETY_MARGIN = 1.15;
const VREF_FACTOR = 1.3; // Vref = factor * Vstall
const FULL_THRUST_TIME = 3.3; // time to change thrust 0-100 or 100-0
const VMCG_VR_FACTOR = 0.65; // Vmcg = factor * Vr; the minimum value of V1

// simulation
const DELTA_T = 0.01; // fidelity, seconds
const APPROACHING_THROTTLE_SPEED_FRACTION = 0.85; // when acceleration starts reducing, fraction of throttle speed
const LOW_REGIME_THRESHOLD = 40;
const HIGH_REGIME_THRESHOLD = 80;
const THRUST_SPEED_ACCELERATION = 1.5;

// max speed at thrust
const TRANSITION_THRUST_FRACTION = 0.55 // is this variable?
const HIGH_SPEED_REGIME_SLOPE = 1.47175

export {
    KTS_TO_FPS,
    FPS_TO_KTS,
    TORA_SAFETY_MARGIN,
    REALISM_PRETEND_FACTOR,
    ROTATE_DURATION,
    FLARE_DURATION,
    LDGDIST_SAFETY_MARGIN,
    VREF_FACTOR,
    FULL_THRUST_TIME,
    VMCG_VR_FACTOR,
    DELTA_T,
    APPROACHING_THROTTLE_SPEED_FRACTION,
    LOW_REGIME_THRESHOLD,
    HIGH_REGIME_THRESHOLD,
    THRUST_SPEED_ACCELERATION,
    TRANSITION_THRUST_FRACTION,
    HIGH_SPEED_REGIME_SLOPE
};

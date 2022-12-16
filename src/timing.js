/**
 * Signature for easing functions used to control animation timing
 *
 * @callback easingFunction
 * @param {number} current Current progress percentile (0 to 1)
 * @return {number}        Eased progress percentile (0 to 1)
 */

/**
 * Linear timing
 *
 * @type {easingFunction}
 */
const TIMING_LINEAR = (current) => current;

/**
 * Cubic ease-in timing
 *
 * @type {easingFunction}
 */
const TIMING_EASE_IN = (current) => current * current * current;

/**
 * Cubic ease-out timing
 *
 * @type {easingFunction}
 */
const TIMING_EASE_OUT = (current) => 1 - Math.pow(1 - current, 3);

/**
 * Cubic ease-in-out timing
 *
 * @type {easingFunction}
 */
const TIMING_EASE_IN_OUT = (current) => {
  return (current < 0.5
    ? 4 * current * current * current
    : 1 - Math.pow(-2 * current + 2, 3) / 2
  );
};

export {
  TIMING_LINEAR,
  TIMING_EASE_IN,
  TIMING_EASE_OUT,
  TIMING_EASE_IN_OUT
};

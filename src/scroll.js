import { getDocumentYOffset } from "./position";
import { TIMING_EASE_IN_OUT } from "./timing";

/**
 * Wrapper to provide `scrollTo` fallback for older browsers
 *
 * @internal
 * @param {ScrollToOptions} options Scroll options
 */
const tryScroll = (options) => {
  try {
    window.scrollTo(options);
  } catch (e) {
    window.scrollTo(options.left, options.top);
  }
};

/**
 * Available options used to control softScroll behaviour
 *
 * @typedef {Object} Options
 * @property {?number} padding        Buffer above element (in pixels)
 * @property {?number} duration       Scroll duration (in milliseconds)
 * @property {?easingFunction} timing Easing function
 */

/**
 * Attempt to softly scroll to a given position over `duration` milliseconds
 *
 * @param {number} target         End Y position (in pixels)
 * @param {number} duration       Time in milliseconds
 * @param {easingFunction} timing Timing function
 */
const animateScroll = (target, duration, timing) => {
  const start_time = performance.now();
  const start_y = window.scrollY;
  const scroll_delta = target - start_y;

  /** @type {FrameRequestCallback} */
  const animate = (time) => {
    const elapsed = time - start_time;

    if (elapsed > duration) {
      return;
    }

    const progress = timing(elapsed / duration);
    const change = progress * scroll_delta;

    window.scroll(0, start_y + change);
    window.requestAnimationFrame(animate);
  };

  window.requestAnimationFrame(animate);
};

/**
 * Perform a soft scroll to the given element
 *
 * @param {HTMLElement} target Target element
 * @param {?Options} options   Scroll options
 */
const simpleScroll = (target, options) => {
  const padding = (options && options.padding) || 0;
  const duration = (options && options.duration) || 0;
  const timing = (options && options.timing) || TIMING_EASE_IN_OUT;
  const target_y = getDocumentYOffset(target) - padding;

  if (!duration) {
    tryScroll({ top: target_y, left: 0, behavior: "smooth" });
  } else {
    animateScroll(target_y, duration, timing);
  }
};

export { simpleScroll };

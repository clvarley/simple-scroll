import { getDocumentYOffset } from './position';

/**
 * Wrapper to provide fallback for older browsers
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
 * Optional objects that can be passed to softScroll
 *
 * @typedef {Object} Options
 * @property {?number} padding  Buffer above element (in pixels)
 * @property {?number} duration Scroll duration (in milliseconds)
 */

/**
 * Attempt to softly scroll to a given position over `duration` milliseconds
 *
 * @param {number} target   End Y position (in pixels)
 * @param {number} duration Time in milliseconds
 */
const animateScroll = (target, duration) => {


  /** @type {FrameRequestCallback} */
  const animate = (time) => {

  };

  window.requestAnimationFrame(animate);
};

/**
 * Perform a soft scroll to the given element
 *
 * @param {HTMLElement} target Target element
 * @param {?Options} options   Scroll options
 */
const softScroll = (target, options) => {
  const padding = (options && options.padding) || 0;
  const duration = (options && options.duration) || 0;
  const target_y = getDocumentYOffset(target) - padding;

  if (!duration) {
    tryScroll({ top: target_y, left: 0, behavior: 'smooth' });
  } else {
    animateScroll(target_y, duration);
  }
};

export { softScroll };

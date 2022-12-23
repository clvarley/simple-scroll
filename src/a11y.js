/**
 * Determine whether or not the user has requested reduced motion
 *
 * @return {boolean} Reduced motion requested?
 */
const reducedMotion = () => {
  return window.matchMedia("(prefers-reduced-motion)").matches;
};

export { reducedMotion };

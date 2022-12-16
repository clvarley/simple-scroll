/**
 * Returns the distance between the given element and the top of the document
 *
 * @param {HTMLElement} element Subject element
 * @return {number}             Element Y position (pixels)
 */
const getDocumentYOffset = (element) => {
  return window.scrollY + element.getBoundingClientRect().top;
};

export { getDocumentYOffset };

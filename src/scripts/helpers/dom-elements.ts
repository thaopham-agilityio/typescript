/**
 * Create an element with an optional CSS class
 * @param {string} tag
 * @param {string} className
 * @returns HTML element
 */
export const createElement = (tag: string, className?: string) => {
  const element = document.createElement(tag);

  className && element.classList.add(className);

  return element;
};

/**
 * Show/hide element
 * @param element  element want to display
 * @param status display status
 * @param loading display loading
 */
export const displayElement = (element: HTMLElement, status: boolean, loading?: string): void => {
  const display = status ? 'block' : 'none';
  const target = loading
    ? (element.parentElement?.querySelector('.loading-indicator') as HTMLElement)
    : element;
  target.style.display = display;
};

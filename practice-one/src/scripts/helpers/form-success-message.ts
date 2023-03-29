/**
 * Add/remove className to parent element
 * @param {HTMLtag} ele
 * @param {string} className
 */
export const setSuccess = (ele: HTMLInputElement | HTMLTextAreaElement) => {
  let parentEle = ele.parentNode as HTMLDivElement;
  parentEle.classList.add('success');
  parentEle.classList.remove('error');
};

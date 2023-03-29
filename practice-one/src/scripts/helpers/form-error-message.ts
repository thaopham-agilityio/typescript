/**
 * Add/remove className to parent element - show message content - enable button when keyup input
 * @param {HTMLtag} ele
 * @param {HTMLtag} btn
 * @param {string} message
 */
export const setError = (
  ele: HTMLInputElement | HTMLTextAreaElement,
  btn: HTMLButtonElement,
  message: string
) => {
  let parentEle = ele.parentNode as HTMLDivElement;
  parentEle.classList.add('error');
  parentEle.classList.remove('success');
  (parentEle.querySelector('.validate-message') as HTMLElement).textContent = message;
  btn.disabled = true;

  ele.addEventListener('keyup', () => {
    if (ele.value) {
      btn.disabled = false;
    }
  });
};

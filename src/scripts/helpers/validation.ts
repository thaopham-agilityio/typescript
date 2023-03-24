import { URL_REGEX } from '../constants/product.constant';

/**
 * Validate input
 * @param Input input element
 * @returns error status
 */
export const checkValidate = (): boolean => {
  const inputName = document.getElementById('productName') as HTMLInputElement;
  const inputPrice = document.getElementById('productPrice') as HTMLInputElement;
  const inputDesc = document.getElementById('productDesc') as HTMLTextAreaElement;
  const inputUrl = document.getElementById('productUrl') as HTMLInputElement;
  const submitBtn = document.getElementById('submit') as HTMLButtonElement;
  let isCheck = true;

  if (!inputName.value) {
    submitBtn.disabled = true;
    inputName.addEventListener('keyup', stateHandleName);
    setError(inputName, 'Please enter product name');
    isCheck = false;
  } else {
    setSuccess(inputName);
  }

  if (!inputPrice.value) {
    submitBtn.disabled = true;
    inputPrice.addEventListener('keyup', stateHandlePrice);
    setError(inputPrice, 'Please enter product price');
    isCheck = false;
  } else if (Number(inputPrice.value) <= 0) {
    setError(inputPrice, 'Please enter product price not include negative or equal to 0');
  } else {
    setSuccess(inputPrice);
  }

  if (!inputDesc.value) {
    submitBtn.disabled = true;
    inputDesc.addEventListener('keyup', stateHandleDesc);
    setError(inputDesc, 'Please enter product description');
    isCheck = false;
  } else {
    setSuccess(inputDesc);
  }

  if (!inputUrl.value || !inputUrl.value.match(URL_REGEX)) {
    submitBtn.disabled = true;
    inputUrl.addEventListener('keyup', stateHandleUrl);
    setError(inputUrl, 'Please enter valid product Url');
    isCheck = false;
  } else {
    setSuccess(inputUrl);
  }

  return isCheck;
};

const setSuccess = (ele: HTMLInputElement | HTMLTextAreaElement) => {
  let parentEle = ele.parentNode as HTMLDivElement;
  parentEle.classList.add('success');
};

const setError = (ele: HTMLInputElement | HTMLTextAreaElement, message: string) => {
  let parentEle = ele.parentNode as HTMLDivElement;
  parentEle.classList.add('error');
  (parentEle.querySelector('.validate-message') as HTMLElement).textContent = message;
};

const stateHandleName = () => {
  const inputName = document.getElementById('inputName') as HTMLInputElement;
  const submitBtn = document.getElementById('submit') as HTMLButtonElement;
  if (!inputName.value) {
    submitBtn.disabled = true;
  } else {
    submitBtn.disabled = false;
    setSuccess(inputName);
  }
};

const stateHandlePrice = () => {
  const inputPrice = document.getElementById('inputPrice') as HTMLInputElement;
  const submitBtn = document.getElementById('submit') as HTMLButtonElement;
  if (!inputPrice.value) {
    submitBtn.disabled = true;
  } else {
    submitBtn.disabled = false;
    setSuccess(inputPrice);
  }
};

const stateHandleDesc = () => {
  const inputDesc = document.getElementById('inputDesc') as HTMLInputElement;
  const submitBtn = document.getElementById('submit') as HTMLButtonElement;
  if (!inputDesc.value) {
    submitBtn.disabled = true;
  } else {
    submitBtn.disabled = false;
    setSuccess(inputDesc);
  }
};

const stateHandleUrl = () => {
  const inputUrl = document.getElementById('productUrl') as HTMLInputElement;
  const submitBtn = document.getElementById('submit') as HTMLButtonElement;
  if (!inputUrl.value) {
    submitBtn.disabled = true;
  } else {
    submitBtn.disabled = false;
    setSuccess(inputUrl);
  }
};

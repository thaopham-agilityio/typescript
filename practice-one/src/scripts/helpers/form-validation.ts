import { URL_REGEX } from '../constants/products';
import { ValidateMessages } from '../constants/validate-messages';
import { setSuccess } from './form-success-message';
import { setError } from './form-error-message';

/**
 * Validate input
 * @param Input input element
 * @returns error status
 */
export const checkValidate = (
  name: HTMLInputElement,
  price: HTMLInputElement,
  desc: HTMLTextAreaElement,
  url: HTMLInputElement,
  btn: HTMLButtonElement
): boolean => {
  let isCheck = true;

  if (!name.value) {
    setError(name, btn, ValidateMessages.INPUT_NAME);
    isCheck = false;
  } else {
    setSuccess(name);
  }

  if (!price.value) {
    setError(price, btn, ValidateMessages.INPUT_PRICE);
    isCheck = false;
  } else if (Number(price.value) <= 0) {
    setError(price, btn, ValidateMessages.INPUT_PRICE_NEGATIVE_ZERO);
  } else {
    setSuccess(price);
  }

  if (!desc.value) {
    setError(desc, btn, ValidateMessages.INPUT_DESC);
    isCheck = false;
  } else {
    setSuccess(desc);
  }

  if (!url.value || !url.value.match(URL_REGEX)) {
    setError(url, btn, ValidateMessages.INPUT_URL);
    isCheck = false;
  } else {
    setSuccess(url);
  }

  return isCheck;
};

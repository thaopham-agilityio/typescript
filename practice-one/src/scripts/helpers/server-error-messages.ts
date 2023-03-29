import { AxiosError } from 'axios';
import { ErrorMapper } from '../constants/error-mapper';
import { ErrorResponse } from '../types/error-messages';

/**
 * Handle error response of a axios request and return message default or custom
 * @param error
 * @return string
 */
export const getErrorMessages = (error: unknown): string => {
  let message = '';

  if (error instanceof Error) {
    const err = error as AxiosError<ErrorResponse>;

    const statusCode: number | undefined = err.response?.status;

    if (statusCode) {
      message = ErrorMapper[statusCode];
    }
  }

  // Set default message if unknown error
  if (!message) {
    message = 'Request failed with error. Please help contact team to identify issue';
  }

  return message;
};

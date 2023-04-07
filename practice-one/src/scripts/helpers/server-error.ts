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

    statusCode && (message = ErrorMapper[statusCode]);
  }

  return message;
};

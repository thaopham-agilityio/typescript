import { StatusCode } from './server-error-status';
import { ErrorMessage } from './server-error-messages';
import { StatusCodeMapper } from '../types/status-code';

export const ErrorMapper: StatusCodeMapper = {
  [StatusCode.BAD_REQUEST]: ErrorMessage.BAD_REQUEST,
  [StatusCode.UNAUTHORIZED]: ErrorMessage.UNAUTHORIZED,
  [StatusCode.FORBIDDEN]: ErrorMessage.FORBIDDEN,
  [StatusCode.NOT_FOUND]: ErrorMessage.NOT_FOUND,
  [StatusCode.INTERNAL_SERVER_ERROR]: ErrorMessage.INTERNAL_SERVER_ERROR,
};

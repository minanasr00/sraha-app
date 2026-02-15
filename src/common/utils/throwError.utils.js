import ApiError from "./ApiError.utils.js";

export const throwError = (errorMessage, statusCode) => {
  throw new ApiError(errorMessage, statusCode);
};

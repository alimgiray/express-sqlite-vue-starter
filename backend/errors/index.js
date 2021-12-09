// Custom error object, derived from node's standard error
// We added some additional fields (like httpCode & isOperational)
// but we didn't lose stacktrace.
function AppError(name, httpCode, description, isOperational) {
  Error.call(this);
  Error.captureStackTrace(this);
  this.name = name;
  this.httpCode = httpCode;
  this.description = description;
  this.isOperational = isOperational;
}

AppError.prototype = Object.create(Error.prototype);
AppError.prototype.constructor = AppError;

const errorTypes = {
  NOT_FOUND: "not-found",
  NOT_AUTHORIZED: "not-authorized",
  NOT_VALID: "not-valid",
};

module.exports = {
  AppError,
  errorTypes,
};

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = this.statusCode.toString().startsWith("4") ? "fail" : "error";
    Error.captureStackTrace(this, this.constructor);
  }
}
module.exports = AppError;

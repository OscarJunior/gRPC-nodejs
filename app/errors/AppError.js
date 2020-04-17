function AppError(name, message, code) {
  Error.call(this);
  Error.captureStackTrace(this);

  this.name = name;
  this.message = message;
  this.code = code;
}

// extends
AppError.prototype = Object.create(Error.prototype);
AppError.prototype.constructor = AppError;

module.exports = AppError;

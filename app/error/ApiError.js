function ApiError(name, message, code) {
  Error.call(this);
  Error.captureStackTrace(this);

  this.name = name;
  this.message = message;
  this.code = code;
}

// extends
ApiError.prototype = Object.create(Error.prototype);
ApiError.prototype.constructor = ApiError;

module.exports = ApiError;

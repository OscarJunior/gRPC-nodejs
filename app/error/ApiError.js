function ApiError(definedError) {
  Error.call(this);
  Error.captureStackTrace(this);

  const { name, code, isOperational = false } = definedError;

  this.name = name;
  this.message = name;
  this.code = code;
  this.isOperational = isOperational;
}

// extends
ApiError.prototype = Object.create(Error.prototype);
ApiError.prototype.constructor = ApiError;

module.exports = ApiError;

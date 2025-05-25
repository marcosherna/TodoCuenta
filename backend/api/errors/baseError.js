export default class BaseError extends Error {
  isOperational;

  constructor(message, status, name, errors = []) {
    super(message);
    this.status = status;
    this.isOperational = true;
    this.name = name;
    this.errors = errors;

    Error.captureStackTrace(this, this.constructor);
  }

  toJSON() {
    return {
      status: this.status,
      name: this.name,
      message: JSON.parse(JSON.stringify(this.message)),
      stack: JSON.parse(JSON.stringify(this.stack)),
      errors: this.errors,
    };
  }
}

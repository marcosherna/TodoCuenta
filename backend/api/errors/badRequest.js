import BaseError from "./baseError.js";

export default class BadRequest extends BaseError {
  constructor(message, errors = []) {
    super(message, 400, "Bad Request", errors);
  }
}

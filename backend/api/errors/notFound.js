import BaseError from "./baseError.js";

export default class NotFound extends BaseError {
  constructor(message) {
    super(message, 404, "Not Found");
  }
}

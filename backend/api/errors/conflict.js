import BaseError from "./baseError.js";

export default class Conflict extends BaseError {
  constructor(message) {
    super(message, 409, "Conflict");
  }
}

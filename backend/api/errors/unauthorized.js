import BaseError from "./baseError.js";

export default class Unauthorized extends BaseError {
  constructor(message) {
    super(message, 401, "Unauthorized");
  }
}

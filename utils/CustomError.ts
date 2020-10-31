/**
 * Custom error class
 */
export default class CustomError extends Error {
  statusCode = 400;
  /**
   * @param {string} message Custom.
   * @return {void}
   */
  constructor(message: string) {
    super();
    this.message = message;
  }
}

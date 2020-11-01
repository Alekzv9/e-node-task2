/**
 * Custom error class
 */
export default class CustomError extends Error {
  statusCode: any;
  /**
   * @param {string} message Custom.
   * @param {number} statusCode Custom status code;
   * @return {void}
   */
  constructor(message: string, statusCode?: number) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}

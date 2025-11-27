export class AppError extends Error {
  constructor(public statusCode: number, public message: string) {
    super(message);

    this.statusCode = statusCode;

    Object.setPrototypeOf(this, AppError.prototype);

    Error.captureStackTrace(this, this.constructor);
  }
}

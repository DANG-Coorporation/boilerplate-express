export class UnprocessableEntityException extends Error {
  constructor(message: string, public readonly errors: any) {
    super(message);
    this.name = "UnprocessableEntityException";
    this.message = message || "Unprocessable Entity";
    this.errors = errors || {};
  }
}

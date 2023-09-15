export class BadRequestException extends Error {
  constructor(message: string, public readonly errors: any = {}) {
    super(message);
    this.name = "BadRequestException";
    this.message = message || "Bad Request";
    this.errors = errors || {};
  }
}

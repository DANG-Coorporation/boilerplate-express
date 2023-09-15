export class UnauthorizedException extends Error {
  constructor(message: string, public readonly errors: any) {
    super(message);
    this.name = "UnauthorizedException";
    this.message = message || "Unauthorized";
    this.errors = errors || {};
  }
}

export class NotFoundException extends Error {
  constructor(message: string, public readonly errors: any) {
    super(message);
    this.name = "NotFoundException";
    this.message = message || "Not Found";
    this.errors = errors || {};
  }
}

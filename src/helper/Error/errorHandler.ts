import { Response } from "express";
import { BadRequestException } from "./BadRequestException/BadRequestException";
import { HttpStatusCode } from "axios";
import { ForbiddenException } from "./Forbidden/ForbiddenException";
import { UnauthorizedException } from "./UnauthorizedException/UnauthorizedException";
import { UnprocessableEntityException } from "./UnprocessableEntity/UnprocessableEntityException";
import { NotFoundException } from "./NotFound/NotFoundException";

export function ProcessError(err: any, res: Response) {
  if (err instanceof BadRequestException) {
    res.status(HttpStatusCode.BadRequest).json({
      message: err.message,
      errors: err.errors,
    });
  } else if (err instanceof NotFoundException) {
    res.status(HttpStatusCode.NotFound).json({
      message: err.message,
      errors: err.errors,
    });
  } else if (err instanceof ForbiddenException) {
    res.status(HttpStatusCode.Forbidden).json({
      message: err.message,
      errors: err.errors,
    });
  } else if (err instanceof UnauthorizedException) {
    res.status(HttpStatusCode.Unauthorized).json({
      message: err.message,
      errors: err.errors,
    });
  } else if (err instanceof UnprocessableEntityException) {
    res.status(HttpStatusCode.UnprocessableEntity).json({
      message: err.message,
      errors: err.errors,
    });
  } else {
    res.status(HttpStatusCode.InternalServerError).json({
      message: err.message ?? "Internal Server Error",
    });
  }
}

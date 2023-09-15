import Validator from "fastest-validator";
import { BadRequestException } from "../Error/BadRequestException/BadRequestException";

export async function validate(schema: any, data: any) {
  try {
    const v = new Validator();
    const check = v.compile(schema);
    const result = check(data);
    if (result !== true) {
      throw new BadRequestException("Invalid data", result);
    }
  } catch (error) {
    throw new BadRequestException("Invalid data", error);
  }
}

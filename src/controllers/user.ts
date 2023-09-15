import { Request, Response } from "express";
import User from "../models/user";
import UserService from "../service/user.service";
import { HttpStatusCode } from "axios";
import { ProcessError } from "../helper/Error/errorHandler";
import { BadRequestException } from "../helper/Error/BadRequestException/BadRequestException";
import { validate } from "../helper/function/validator";
import { postUserValidator } from "../helper/validator/postUser.validator";

export class UserController {
  userServices: UserService;

  constructor() {
    this.userServices = new UserService();
  }

  async paginate(req: Request, res: Response): Promise<void> {
    try {
      const { page, limit } = req.query;
      const users = await this.userServices.page({
        page: Number(page),
        limit: Number(limit),
        data: { ...req.query },
      });
      res.status(HttpStatusCode.Ok).json(users);
    } catch (err) {
      ProcessError(err, res);
    }
  }

  async read(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (!id) throw new BadRequestException("Invalid id", {});
      const user = await this.userServices.getById(id);
      const userObject = user.toJSON();
      res.json(userObject);
    } catch (err) {
      ProcessError(err, res);
    }
  }

  async create(req: Request, res: Response) {
    try {
      await validate(postUserValidator, req.body);
      const user = await this.userServices.create(req.body);
      res.json(user.toJSON());
    } catch (err) {
      ProcessError(err, res);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const [affectedRows] = await User.update(req.body, {
        where: { id: req.params.id },
      });
      res.json({
        affectedRows: affectedRows || 0,
      });
    } catch (err) {
      ProcessError(err, res);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (!id) throw new BadRequestException("Invalid id", {});
      const affectedRows = await this.userServices.deleteById(id);
      res.status(HttpStatusCode.Ok).json({
        affectedRows: affectedRows || 0,
      });
    } catch (err) {
      ProcessError(err, res);
    }
  }
}

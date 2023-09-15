import { Request, Response } from "express";
import User from "../models/user";
import UserService from "../service/user.service";
import { HttpStatusCode } from "axios";
import { ProcessError } from "../helper/Error/errorHandler";

export class UserController {
  userServices: UserService;

  constructor() {
    this.userServices = new UserService();
  }

  async readAll(req: Request, res: Response): Promise<void> {
    try {
      const users = await User.findAll();
      // Map Sequelize instances to plain objects
      const userObjects = users.map((user: any) => user.get({ plain: true }));
      res.json(userObjects);
    } catch (err) {
      res.json(err);
    }
  }

  async read(req: Request, res: Response) {
    try {
      const user = await User.findByPk(req.params.id);
      if (user) {
        // Cast user to UserInterface
        const userObject = user.get({ plain: true });
        res.json(userObject);
      } else {
        res.status(204).send();
      }
    } catch (err) {
      res.json(err);
    }
  }

  async create(req: Request, res: Response) {
    try {
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
      res.json(err);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const removedRows = await User.destroy({
        where: { id: req.params.id },
      });
      res.json({
        removedRows: removedRows || 0,
      });
    } catch (err) {
      res.json(err);
    }
  }
}

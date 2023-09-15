import User, { UserCreationAttributes } from "../models/user";

export default class UserService {
  async create(input: UserCreationAttributes) {
    try {
      console.log(input);
      const user = await User.create(input);
      return user;
    } catch (error: any) {
      console.log(error);
      throw new Error(`Error creating user: ${error.message}`);
    }
  }
}

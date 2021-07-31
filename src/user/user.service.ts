import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { AllUsers } from './user.types';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async allUsers(skip: string, limit: string): Promise<AllUsers> {
    const users = await this.userModel
      .find()
      .select({ email: 1 })
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .lean();

    const total = await this.getCount();

    return { total, users };
  }

  private async getCount(): Promise<number> {
    return this.userModel.estimatedDocumentCount();
  }

  async createUser(user: User): Promise<User> {
    try {
      const newUser = await this.userModel.create(user);
      delete newUser?.password;
      return newUser;
    } catch (e) {
      throw e;
    }
  }
}

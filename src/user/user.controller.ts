import { Controller, Get, Post, Query } from '@nestjs/common';
import { User } from './user.schema';
import { UserService } from './user.service';
import { AllUsers } from './user.types';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  users(
    @Query('skip') skip = '1',
    @Query('limit') limit = '10',
  ): Promise<AllUsers> {
    return this.userService.allUsers(skip, limit);
  }

  @Post()
  async create(): Promise<User[]> {
    return [];
  }
}

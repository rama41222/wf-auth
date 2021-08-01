import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { User } from './user.schema';
import { UserService } from './user.service';

const userRepository = () => {
  find: jest.fn();
};

describe('UserController', () => {
  let controller: UserController;
  let clientUserModel;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        { provide: getModelToken('User'), useValue: userRepository },
      ],
    }).compile();
    clientUserModel = module.get(getModelToken('User'));
    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(clientUserModel).toBeDefined();
  });
});

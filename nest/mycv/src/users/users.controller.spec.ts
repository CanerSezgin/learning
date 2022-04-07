import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service'
import { AuthService } from './auth.service'
import { User } from './users.entity'
import { NotFoundException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let mockUsersService: Partial<UsersService>;
  let mockAuthService: Partial<AuthService>;

  beforeEach(async () => {
    mockUsersService = {
      findOne: (id: number) => {
        return Promise.resolve({ id, email: 'asd@asd.com', password: 'pass' } as User)
      },
      find: (email: string) => {
        return Promise.resolve([{ id: 1, email, password: 'pass' } as User])
      },
      /* remove: () => { },
      update: () => { }, */
    }

    mockAuthService = {
      /* signup: () => {}, */
      signin: (email: string, password: string) => Promise.resolve({ id: 1, email, password } as User)
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService
        },
        {
          provide: AuthService,
          useValue: mockAuthService
        }
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAllUsers returns a list of users with the given email', async () => {
    const email = 'asd@asd.com'
    const users = await controller.findAllUsers(email)
    expect(users.length).toEqual(1)
    expect(users[0].email).toEqual(email)
  });

  it('findUser returns a single user with the given id', async () => {
    const user = await controller.findUser('1')
    expect(user).toBeDefined()
  });

  it('findUser throws an error if user with the given id is not found', async () => {
    mockUsersService.findOne = (id: number) => null
    await expect(controller.findUser('1')).rejects.toThrow(NotFoundException)
  });

  it('signin updates session object and returns user', async () => {
    const session = { userId: -10 }
    const user = await controller.signin(
      { email: 'email@email', password: 'pass' },
      session
    )

    expect(user.id).toEqual(1)
    expect(session.userId).toEqual(1)
    console.log(session)
  });
});

import { NextFunction, Request, Response } from 'express';
import { UserRepo } from '../repository/user.mongo.repository';
import { UserController } from './user.controller';
import { Repo } from '../repository/repo';
import { User } from '../entities/user';

describe('Given the ', () => {
  describe('When ', () => {
    const mockRepo: UserRepo = {
      create: jest.fn(),
      search: jest.fn(),
    } as UserRepo;
    const res = {
      send: jest.fn(),
      status: jest.fn(),
    } as unknown as Response;
    const next = jest.fn() as NextFunction;
    const req = { body: { user: 'juan', password: 'asdasd' } } as Request;
    const controller = new UserController(mockRepo as unknown as Repo<User>);
    test('Then it should ', async () => {
      await controller.register(req, res, next);
      expect(res.send).toHaveBeenCalled();
      expect(mockRepo.create).toHaveBeenCalled();
    });

    // TEMP test('Then ', async () => {
    //   await controller.register(req, res, next);
    //   expect(res.send).toHaveBeenCalled();
    //   expect(mockRepo.search).toHaveBeenCalled();
    // });
  });
});

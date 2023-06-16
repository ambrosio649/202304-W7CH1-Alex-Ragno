import { NextFunction, Request, Response } from 'express';
import { FilmRepo } from '../repository/film.mongo.repository';
import { FilmController } from './film.controller';
import { UserRepo } from '../repository/user.mongo.repository';

describe('Given FilmController class', () => {
  describe('When it is instantiated', () => {
    const mockRepo: FilmRepo = {
      query: jest.fn(),
      queryById: jest.fn(),
      search: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
    const req = {
      params: { id: 1 },
    } as unknown as Request;
    const res = {
      send: jest.fn(),
    } as unknown as Response;
    const next = jest.fn() as NextFunction;
    const controller = new FilmController(mockRepo, new UserRepo());
    test('Then method getAll should be used', async () => {
      await controller.getAll(req, res, next);
      expect(res.send).toHaveBeenCalled();
      expect(mockRepo.query).toHaveBeenCalled();
    });

    test('Then method getByID should be used', async () => {
      await controller.getById(req, res, next);
      expect(res.send).toHaveBeenCalled();
      expect(mockRepo.queryById).toHaveBeenCalled();
    });
  });
});

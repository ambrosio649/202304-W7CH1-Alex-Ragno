import { NextFunction, Request, Response } from 'express';
import { MonsterController } from './monster.controller.js';
import { Monster } from '../entities/monster.js';
import { Repo } from '../repository/repo.js';

describe('Given MonsterController class', () => {
  describe('When it is instantiated', () => {
    const mockRepo = {
      query: jest.fn(),
      queryById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as unknown as Repo<Monster>;
    const req = {
      params: { id: 1 },
    } as unknown as Request;
    const res = {
      send: jest.fn(),
    } as unknown as Response;
    const next = jest.fn() as NextFunction;
    const controller = new MonsterController(mockRepo);
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

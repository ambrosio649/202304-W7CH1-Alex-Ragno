import { NextFunction, Request, Response } from 'express';
import { MonsterRepo } from '../repository/monster.repository.js';
import createDebug from 'debug';
const debug = createDebug('W6:MonsterController');

export class MonsterController {
  // eslint-disable-next-line no-unused-vars
  constructor(private repo: MonsterRepo) {
    debug('Instantiated MonsterController');
    debug(this.repo);
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      res.send(await this.repo.query());
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      res.send(await this.repo.queryById(req.params.id));
    } catch (error) {
      next(error);
    }
  }

  async post(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(201);
      res.send(await this.repo.create(req.body));
    } catch (error) {
      next(error);
    }
  }

  async patch(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(202);
      res.send(await this.repo.update(req.params.id, req.body));
    } catch (error) {
      next(error);
    }
  }

  async deleteById(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(204);
      res.send(await this.repo.delete(req.params.id));
    } catch (error) {
      next(error);
    }
  }
}

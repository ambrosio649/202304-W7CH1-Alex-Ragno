import { Router as createRouter } from 'express';
import { MonsterController } from '../controllers/monster.controller.js';
import { MonsterRepo } from '../repository/monster.repository.js';
import { Repo } from '../repository/repo.js';
import { Monster } from '../entities/monster.js';

const repo: Repo<Monster> = new MonsterRepo();
const controller = new MonsterController(repo);
export const monsterRouter = createRouter();

monsterRouter.get('/', controller.getAll.bind(controller));
monsterRouter.get('/:id', controller.getById.bind(controller));
monsterRouter.post('/', controller.post.bind(controller));
monsterRouter.patch('/:id', controller.patch.bind(controller));
monsterRouter.delete('/:id', controller.deleteById.bind(controller));

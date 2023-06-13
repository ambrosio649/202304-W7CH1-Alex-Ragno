import { MonsterRepo } from '../repository/monster.repository.js';
import { Controller } from './controller.js';
import { Monster } from '../entities/monster.js';

import createDebug from 'debug';
const debug = createDebug('W6:MonsterController');

export class MonsterController extends Controller<Monster> {
  // eslint-disable-next-line no-unused-vars
  constructor(protected repo: MonsterRepo) {
    super();
    debug('Instantiated');
  }
}

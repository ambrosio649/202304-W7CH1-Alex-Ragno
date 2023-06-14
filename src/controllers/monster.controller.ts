import { Controller } from './controller.js';
import { Monster } from '../entities/monster.js';

import createDebug from 'debug';
import { Repo } from '../repository/repo.js';
const debug = createDebug('W6:MonsterController');

export class MonsterController extends Controller<Monster> {
  // eslint-disable-next-line no-unused-vars
  constructor(protected repo: Repo<Monster>) {
    super();
    debug('Instantiated');
  }
}

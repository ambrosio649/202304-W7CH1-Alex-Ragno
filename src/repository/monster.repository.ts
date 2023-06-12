import fs from 'fs/promises';
import createDebug from 'debug';
import { Monster } from '../entities/monster.js';
import { Repo } from './repo.js';
import { HttpError } from '../types/http.error.js';
const debug = createDebug('W6:MonsterRepo');

const file = './data.json';

const createID = (): Monster['id'] =>
  Math.trunc(Math.random() * 1_000_000).toString();

export class MonsterRepo implements Repo<Monster> {
  constructor() {
    debug('Monster Repo');
  }

  async query() {
    const stringData = await fs.readFile(file, { encoding: 'utf-8' });
    const aData = JSON.parse(stringData) as Monster[];
    return aData;
  }

  async queryById(id: string) {
    const aData = await this.query();
    const result = aData.find((item) => item.id === id);
    if (!result) throw new HttpError(404, 'Not found', 'Bad id for the query');
    return result;
  }

  async create(data: Omit<Monster, 'id'>) {
    const aData = await this.query();
    const newMonster: Monster = { ...data, id: createID() };
    const result = JSON.stringify([...aData, newMonster]);
    await fs.writeFile(file, result, { encoding: 'utf8' });
    return newMonster;
  }

  async update(id: string, data: Partial<Monster>) {
    const aData = await this.query();
    let newMonster: Monster = {} as Monster;
    const result = aData.map((item) => {
      if (item.id === id) {
        newMonster = { ...item, ...data };
        return newMonster;
      }

      return item;
    });

    if (!newMonster!.id)
      throw new HttpError(404, 'Not found', 'Bad id for the update');

    await fs.writeFile(file, JSON.stringify(result), { encoding: 'utf8' });
    return newMonster;
  }

  async delete(id: string) {
    const aData = await this.query();
    const result = aData.filter((item) => item.id !== id);
    if (aData.length === result.length)
      throw new HttpError(404, 'Not found', 'Bad id for the delete');

    await fs.writeFile(file, JSON.stringify(result), { encoding: 'utf8' });
  }
}

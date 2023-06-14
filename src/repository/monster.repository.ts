import fs from 'fs/promises';
import createDebug from 'debug';
import { Monster } from '../entities/monster.js';
import { Repo } from './repo.js';
import { HttpError } from '../types/http.error.js';
const debug = createDebug('W6:MonsterRepo');

const file = './data.json';

const createID = (): Monster['id'] =>
  Math.trunc(Math.random() * 1_000_000).toString();

export class MonsterRepo implements Omit<Repo<Monster>, 'search'> {
  constructor() {
    debug('Instantiated');
  }

  async query() {
    const stringData = await fs.readFile(file, { encoding: 'utf-8' });
    const currentData = JSON.parse(stringData) as Monster[];
    return currentData;
  }

  async queryById(id: string) {
    const currentData = await this.query();
    const result = currentData.find((item) => item.id === id);
    if (!result) throw new HttpError(404, 'Not found', 'Bad id for the query');
    return result;
  }

  async create(data: Omit<Monster, 'id'>) {
    const currentData = await this.query();
    const newMonster: Monster = { ...data, id: createID() };
    const result = JSON.stringify([...currentData, newMonster]);
    await fs.writeFile(file, result, { encoding: 'utf8' });
    return newMonster;
  }

  async update(id: string, data: Partial<Monster>) {
    const currentData = await this.query();
    let newMonster: Monster = {} as Monster;
    const result = currentData.map((item) => {
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
    const currentData = await this.query();
    const result = currentData.filter((item) => item.id !== id);
    if (currentData.length === result.length)
      throw new HttpError(404, 'Not found', 'Bad id for the delete');

    await fs.writeFile(file, JSON.stringify(result), { encoding: 'utf8' });
  }
}

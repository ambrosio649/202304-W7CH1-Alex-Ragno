import createDebug from 'debug';
import { User } from '../entities/user.js';
import { Repo } from './repo.js';
import { UserModel } from './user.mongo.model.js';

const debug = createDebug('W6:UserRepo');

export class UserRepo implements Partial<Repo<User>> {
  constructor() {
    debug('Instantiate', UserModel);
  }

  async search({
    key,
    value,
  }: {
    key: string;
    value: unknown;
  }): Promise<User[]> {
    const result = await UserModel.find({ [key]: value }).exec();
    return result;
  }

  async create(data: Omit<User, 'id'>): Promise<User> {
    const newUser = await UserModel.create(data);
    return newUser;
  }
}

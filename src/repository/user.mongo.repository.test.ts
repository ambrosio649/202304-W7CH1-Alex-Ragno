import { User } from '../entities/user';
import { UserModel } from './user.mongo.model';
import { UserRepo } from './user.mongo.repository';

describe('Given the UserRepo class', () => {
  describe('When I instaintiate it', () => {
    const repo = new UserRepo();

    test('Then method create should be used', async () => {
      const mockUserData: Omit<User, 'id'> = {
        userName: 'Juan',
        email: 'juan@asd',
        password: 'asd',
      };
      UserModel.create = jest.fn().mockReturnValueOnce({});

      const result = await repo.create(mockUserData);

      expect(UserModel.create).toHaveBeenCalled();
      expect(result).toEqual({});
    });

    test('Then method search should be used', async () => {
      const exec = jest.fn().mockResolvedValue({
        key: 'asd',
        value: 'unknown',
      });
      UserModel.find = jest.fn().mockReturnValueOnce({ exec });

      const result = await repo.search({ key: 'asd', value: 'unknown' });

      expect(UserModel.find).toHaveBeenCalled();
      expect(result).toEqual({ key: 'asd', value: 'unknown' });
    });
  });
});

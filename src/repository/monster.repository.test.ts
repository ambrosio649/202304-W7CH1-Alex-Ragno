import fs from 'fs/promises';
import { MonsterRepo } from './monster.repository';

jest.mock('fs/promises');

describe('Given MonsterRepo Class', () => {
  describe('When I instantiate it', () => {
    const repo = new MonsterRepo();

    test('Then method query should be used', async () => {
      (fs.readFile as jest.Mock).mockResolvedValueOnce('[]');
      const result = await repo.query();
      expect(fs.readFile).toHaveBeenCalled();
      expect(result).toEqual([]);
    });

    test('Then method queryById should be used', async () => {
      const mockMonster = [{ id: '1' }];
      (fs.readFile as jest.Mock).mockResolvedValueOnce(
        JSON.stringify(mockMonster)
      );
      const result = await repo.queryById('1');
      expect(fs.readFile).toHaveBeenCalled();
      expect(result).toEqual(mockMonster[0]);
    });
  });
});

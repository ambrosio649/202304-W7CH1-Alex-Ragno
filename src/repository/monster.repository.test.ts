import fs from 'fs/promises';
import { MonsterRepo } from './monster.repository';
import { Monster } from '../entities/monster';

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

    test('Then method queryById should be throw an error', async () => {
      const mockMonster = [{ id: '' }];

      (fs.readFile as jest.Mock).mockResolvedValueOnce(
        JSON.stringify(mockMonster)
      );
      const result = await repo.queryById('');

      expect(fs.readFile).toHaveBeenCalled();
      expect(result).toEqual(mockMonster[0]);
    });

    test('Then method create should be called', async () => {
      const mockMonsterName = { name: '' };
      const mockMonster = [] as Monster[];

      (fs.readFile as jest.Mock).mockResolvedValueOnce(
        JSON.stringify(mockMonster)
      );
      await repo.create(mockMonsterName);

      expect(fs.writeFile).toHaveBeenCalled();
    });

    test('Then method update should be called', async () => {
      const mockMonsterName = { name: 'asd' };
      const mockMonster = [
        { id: '1', name: '' },
        { id: '2', name: '' },
      ] as Monster[];
      const mockId = '1';
      (fs.readFile as jest.Mock).mockResolvedValueOnce(
        JSON.stringify(mockMonster)
      );

      const result = await repo.update(mockId, mockMonsterName);

      expect(fs.writeFile).toHaveBeenCalled();
      expect(result).toEqual({ id: '1', name: 'asd' });
    });

    test('Then it should return void', async () => {
      const mockMonster = [
        { id: '1', name: '' },
        { id: '2', name: '' },
      ] as Monster[];
      const mockId = '1';
      (fs.readFile as jest.Mock).mockResolvedValueOnce(
        JSON.stringify(mockMonster)
      );

      await repo.delete(mockId);

      expect(fs.writeFile).toHaveBeenCalled();
    });
  });
});

import { FilmRepo } from './film.mongo.repository.js';
import { FilmModel } from './film.mongo.model.js';

jest.mock('./film.mongo.model.js');

// T (FilmModel as unknown as jest.Mock).mockReturnValue({
//   find: jest.fn().mockReturnValueOnce({
//     exec: jest.fn().mockResolvedValue([]),
//   }),
//   findById: jest.fn(),
//   create: jest.fn(),
//   findByIdAndUpdate: jest.fn(),
//   findByIdAndDelete: jest.fn(),
// });

describe('Given FilmRepo Class', () => {
  describe('When I instantiate it', () => {
    const repo = new FilmRepo();

    test('Then method query should be used', async () => {
      const exec = jest.fn().mockResolvedValue([]);

      FilmModel.find = jest.fn().mockReturnValueOnce({ exec });

      const result = await repo.query();

      expect(FilmModel.find).toHaveBeenCalled();
      expect(exec).toHaveBeenCalled();
      expect(result).toEqual([]);
    });

    // T test('Then method queryById should be used', async () => {
    //   const mockFilm = [{ id: '1' }];

    //   (fs.readFile as jest.Mock).mockResolvedValueOnce(
    //     JSON.stringify(mockFilm)
    //   );
    //   const result = await repo.queryById('1');

    //   expect(fs.readFile).toHaveBeenCalled();
    //   expect(result).toEqual(mockFilm[0]);
    // });

    // test('Then method queryById should be throw an error', async () => {
    //   const mockFilm = [{ id: '' }];

    //   (fs.readFile as jest.Mock).mockResolvedValueOnce(
    //     JSON.stringify(mockFilm)
    //   );
    //   const result = await repo.queryById('');

    //   expect(fs.readFile).toHaveBeenCalled();
    //   expect(result).toEqual(mockFilm[0]);
    // });

    // test('Then method create should be called', async () => {
    //   const mockFilmName = { name: '' };
    //   const mockFilm = [] as Film[];

    //   (fs.readFile as jest.Mock).mockResolvedValueOnce(
    //     JSON.stringify(mockFilm)
    //   );
    //   await repo.create(mockFilmName);

    //   expect(fs.writeFile).toHaveBeenCalled();
    // });

    // test('Then method update should be called', async () => {
    //   const mockFilmName = { name: 'asd' };
    //   const mockFilm = [
    //     { id: '1', name: '' },
    //     { id: '2', name: '' },
    //   ] as Film[];
    //   const mockId = '1';
    //   (fs.readFile as jest.Mock).mockResolvedValueOnce(
    //     JSON.stringify(mockFilm)
    //   );

    //   const result = await repo.update(mockId, mockFilmName);

    //   expect(fs.writeFile).toHaveBeenCalled();
    //   expect(result).toEqual({ id: '1', name: 'asd' });
    // });

    // test('Then it should return void', async () => {
    //   const mockFilm = [
    //     { id: '1', name: '' },
    //     { id: '2', name: '' },
    //   ] as Film[];
    //   const mockId = '1';
    //   (fs.readFile as jest.Mock).mockResolvedValueOnce(
    //     JSON.stringify(mockFilm)
    //   );

    //   await repo.delete(mockId);

    //   expect(fs.writeFile).toHaveBeenCalled();
    // });
  });
});

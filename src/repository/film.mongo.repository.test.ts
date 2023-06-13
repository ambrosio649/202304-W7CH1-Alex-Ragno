import { FilmRepo } from './film.mongo.repository.js';
import { FilmModel } from './film.mongo.model.js';
import { Film } from '../entities/film.js';

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

    test('Then method queryById should be used', async () => {
      const mockID = '3132164';
      const exec = jest.fn().mockResolvedValue({ id: mockID });
      FilmModel.findById = jest.fn().mockReturnValueOnce({ exec });

      const result = await repo.queryById(mockID);

      expect(FilmModel.findById).toHaveBeenCalled();
      expect(exec).toHaveBeenCalled();
      expect(result).toEqual({ id: mockID });
    });

    test('Then method create should be called', async () => {
      const mockFilmData: Omit<Film, 'id'> = {
        title: 'Juan and Marco',
        director: 'Juan',
      };
      FilmModel.create = jest.fn().mockReturnValueOnce({});

      const result = await repo.create(mockFilmData);

      expect(FilmModel.create).toHaveBeenCalled();
      expect(result).toEqual({});
    });

    test('Then method update should be called', async () => {
      const mockId = '1';

      const mockFilmName = { title: 'asd' } as Partial<Film>;
      const exec = jest.fn().mockResolvedValue({} as Film);
      FilmModel.findByIdAndUpdate = jest.fn().mockReturnValueOnce({ exec });

      const result = await repo.update(mockId, mockFilmName);

      expect(FilmModel.findByIdAndUpdate).toHaveBeenCalled();
      expect(exec).toHaveBeenCalled();
      expect(result).toEqual({});
    });

    test('Then method delete should be called', async () => {
      const mockId = '1';

      const exec = jest.fn().mockResolvedValue(null);
      FilmModel.findByIdAndDelete = jest.fn().mockReturnValueOnce({ exec });

      await expect(repo.delete(mockId)).rejects.toThrow();
    });
  });
});

// T test('Then method queryById should be throw an error', async () => {
//   const mockFilm = [{ id: '' }];

//   (fs.readFile as jest.Mock).mockResolvedValueOnce(
//     JSON.stringify(mockFilm)
//   );
//   const result = await repo.queryById('');

//   expect(fs.readFile).toHaveBeenCalled();
//   expect(result).toEqual(mockFilm[0]);
// });

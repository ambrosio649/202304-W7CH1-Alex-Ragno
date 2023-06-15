import { Schema, model } from 'mongoose';
import { Film } from '../entities/film';

const FilmSchema = new Schema<Film>({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  director: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

FilmSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject._id;
    // T delete returnedObject.password;
  },
});

export const FilmModel = model('Film', FilmSchema, 'films');

import Joi from 'joi';
import Song from './song.model';

export default {
  async create(req, res) {
    try {
      const schema = Joi.object().keys({
        title: Joi.string().required(),
        url: Joi.string().required(),
        rating: Joi.number()
          .integer()
          .min(0)
          .max(5)
          .optional(),
      });
      const { value, error } = schema.validate(req.body);
      if (error && error.details) {
        return res.status(400).json(error);
      }
      const song = await Song.create(value);
      return res.json(song);
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  }
};
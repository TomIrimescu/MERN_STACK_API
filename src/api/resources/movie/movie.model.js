import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const { Schema } = mongoose;
const movieSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Movie must have title']
  },
  url: {
    type: String,
    required: [true, 'Movie must have url']
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  }
});
movieSchema.plugin(mongoosePaginate);
export default mongoose.model('Movie', movieSchema);

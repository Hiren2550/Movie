import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    release_date: {
      type: String,
    },
    first_air_date: {
      type: String,
    },

    poster_path: {
      type: String,
      required: true,
    },
    title: {
      type: String,
    },
    name: {
      type: String,
    },
    overview: {
      type: String,
      required: true,
    },
    media_type: {
      type: String,
      required: true,
    },
    adult: {
      type: Boolean,
      required: true,
    },
    vote_count: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;

import fetch from "node-fetch";
import Movie from "../models/movie.model.js";

const url =
  "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NzRkNjhkOTkzNTRhNGU4NWI3MDU1MjBkMTRkYjI5ZSIsIm5iZiI6MTcyNDc2ODQ5OC4wNTIxNTUsInN1YiI6IjY2Y2RkZmViODAyMzk5ZjkwOWJkMTdkYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.__b4oOF6YvzhAY5WDWVUufXWGguO2r4gRMfrwWw49SE",
  },
};

export const addMoviesAPI = async (req, res, next) => {
  try {
    const response = await fetch(url, options);
    let data = await response.json();
    data = data.results;
    for (let i = 0; i < data.length; i++) {
      const m = new Movie(data[i]);
      await m.save();
    }

    res.status(201).json({ message: "all movies saved" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const movies = async (req, res, next) => {
  try {
    const data = await Movie.find();
    res.status(201).json({ result: data, success: true });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const movie = async (req, res, next) => {
  try {
    const id = req.params.id;
    const movie = await Movie.findById(id);
    res.status(201).json(movie);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const searchmovies = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const startIndex = parseInt(req.query.startIndex) || 0;
    const sort = req.query.sort || "vote_count";
    const order = req.query.order || "desc";
    const searchTerm = req.query.searchTerm || "";
    const movies = await Movie.find({
      title: { $regex: searchTerm, $options: "i" },
      // name:{$regex:searchTerm,options:'i'}
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    res.status(201).json(movies);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

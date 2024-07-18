import fetch from "node-fetch";
import Movie from "../models/movie.model.js";

const url = "https://api.themoviedb.org/3/trending/all/day?language=en-US";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NzI5YWRkNzExYzM2OTYwNjk5MDIyZGQ4YTRmMjhiMCIsIm5iZiI6MTcyMTE5MTc5NC42NzUwMiwic3ViIjoiNjY5NWY2MmUzYjQ3YzAzNzI2MTU0YWMzIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.ltKv2jEH7DlkLM7qtWYsIg3c73A5dfHAl_EWZgZQHko",
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
    const id = Number(req.params.id);
    const response = await fetch(url, options);
    let data = await response.json();
    data = data.results;

    const movie_data = await data.find((data) => id === data.id);

    res.status(201).json(movie_data);
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

import express from "express";
import {
  movies,
  movie,
  addMoviesAPI,
  searchmovies,
} from "../controllers/movie.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
const router = express.Router();

router.get("/movies", verifyToken, movies);
router.post("/movies", verifyToken, addMoviesAPI);
router.get("/movies/:id", verifyToken, movie);
router.get("/searchmovies", verifyToken, searchmovies);

export default router;

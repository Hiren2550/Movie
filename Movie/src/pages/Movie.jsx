import React, { useEffect, useState } from "react";
import { FaList, FaPlay } from "react-icons/fa";
import { AiTwotoneLike } from "react-icons/ai";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";

const Movie = () => {
  const params = useParams();
  console.log(params);
  const [load, setLoad] = useState(false);
  const [movie, setMovie] = useState({});
  // console.log(movie);
  const fetchMovie = async () => {
    setLoad(true);
    const res = await fetch(`/api/movies/${params.id}`);
    const data = await res.json();
    //console.log(data);
    setMovie(data);
    setLoad(false);
  };
  useEffect(() => {
    fetchMovie();
  }, []);
  return (
    <>
      {load && (
        <div className="flex justify-center p-2">
          <Loading />
        </div>
      )}
      {movie && !load && (
        <div
          className="bg-gradient-to-r from-slate-600 to-slate-900 w-full h-full sm:h-screen flex
      flex-col sm:flex-row p-4
    opacity-89 "
        >
          <div className="py-3 px-4 ">
            <img
              className="rounded-lg hover:scale-95 "
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt="Poster_Image"
              height={300}
              width={366}
            />
          </div>
          <div className="px-3 py-5 text-white w-2/3">
            <h1 className="font-semibold text-3xl">
              {movie.title || movie.name}
            </h1>
            <h1 className="">
              Released on {movie.release_date || movie.first_air_date}
            </h1>
            <h1 className="font-bold text-xl mt-2">Overview</h1>
            <h1 className="italic text-wrap mt-1">{movie.overview}</h1>

            <h1 className="font-bold text-xl mt-3">Other Information</h1>
            <h1 className="mt-1">Media Type : {movie.media_type}</h1>
            <h1 className="">This is Adult Content {movie.adult}</h1>
            <h1 className="">Vote count : {movie.vote_count}</h1>
            <h1 className="">Popularity : {movie.popularity}</h1>
            <h1 className="">Status : Released</h1>
            <h1>IMDB rating : {movie.vote_average}/10</h1>

            <div className="flex flex-row gap-3 m-3">
              <div className="bg-blue-800 p-3 rounded-full hover:scale-105 cursor-pointer">
                <FaList size={17} />
              </div>
              <div className="bg-blue-800 p-3 rounded-full hover:scale-105 cursor-pointer">
                <AiTwotoneLike size={17} />
              </div>
              <div className="bg-blue-800 p-3 rounded-full hover:scale-105 cursor-pointer">
                <FaPlay size={17} />
              </div>
              <h1 className="text-center items-center flex flex-row">
                Play Trailer
              </h1>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Movie;

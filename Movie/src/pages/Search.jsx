import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

const Search = () => {
  const [movies, setMovies] = useState([]);
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  const getMovies = async (searchTermFromUrl) => {
    setLoad(true);
    const res = await fetch(
      `/api/searchmovies/?searchTerm=${searchTermFromUrl}`
    );
    const data = await res.json();
    setMovies(data);
    setLoad(false);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    //console.log(searchTermFromUrl);
    getMovies(searchTermFromUrl);
  }, [location.search]);
  return (
    <div className="px-4 py-4">
      <h1 className="text-3xl text-center font-semibold my-4">
        Popular Movies
      </h1>

      <div className="flex flex-col sm:flex-row flex-wrap justify-center ">
        {load && <Loading />}
        {!load && movies.length < 1 && (
          <p className="text-xl font-semibold text-slate-800 p-2">
            Sorry, No movie exist for this title
          </p>
        )}
        {!load &&
          movies.map((movie) => (
            <Link
              key={movie.id}
              to={`/movies/${movie.id}`}
              className="rounded m-4 max-w-sm border border-gray-500 w-full sm:w-1/6"
            >
              <img
                className="hover:scale-105 w-full  "
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt="Poster_image"
                height={200}
                width={220}
              />
              <div className="p-4">
                <h1 className="font-bold hover:underline cursor-pointer">
                  {movie.title || movie.name}
                </h1>
                <h1 className="text-slate-600 font-semibold">
                  {movie.release_date || movie.first_air_date}
                </h1>
                <button
                  className="cursor-pointer mt-2 bg-blue-900 hover:opacity-80 text-white py-2 px-3 rounded-lg"
                  onClick={() => navigate(`/movies/${movie.id}`)}
                >
                  View details
                </button>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Search;

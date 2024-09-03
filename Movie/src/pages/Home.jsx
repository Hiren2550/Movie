import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  const getMovies = async () => {
    setLoad(true);
    const res = await fetch("/api/movies");
    const data = await res.json();
    setMovies(data.result);
    setLoad(false);
  };

  useEffect(() => {
    getMovies();
  }, []);
  return (
    <div className="px-4 py-4">
      <h1 className="text-3xl text-center font-semibold my-4">
        Popular Movies
      </h1>

      <div className="flex flex-col sm:flex-row flex-wrap justify-center ">
        {load && <Loading />}

        {!load &&
          movies.map((movie) => (
            <Link
              key={movie.id}
              to={`/movies/${movie._id}`}
              className="rounded m-4 max-w-sm border border-gray-500 w-full p-6 sm:p-1 sm:w-1/6"
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

export default Home;

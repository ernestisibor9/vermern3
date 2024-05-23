import React from "react";
import MovieHero from "../component/images/moviehero.png";
import MovieCard from "../component/MovieCard";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <div className="container mt-4">
        <div className="row">
          <img src={MovieHero} alt="movie_hero" className="img-fluid" />
        </div>
        <h1 className="mt-5 mb-4 text-center">Latest Releases</h1>
        <MovieCard />
        <div className="text-center mt-5 mt-4">
            <Link to ='/movie' className="btn btn-primary">VIEW ALL MOVIES</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;

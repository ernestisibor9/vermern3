import React, { useEffect, useState } from "react";
import { getAllMovies } from "../api_helpers/api_helpers";

function MovieCard() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((error) => error.message);
  }, []);
  console.log(movies);
  return (
    <div>
      <div class="card-group">
        {
            movies && movies.slice(1,4).map((item)=>{
                return(
                    <div class="card">
          <img
            src={item.posterUrl}
            class="card-img-top"
            alt="..."
          />
          <div class="card-body">
            <h5 class="card-title">{item.title}</h5>
            <p class="card-text">
              {item.description}.
            </p>
            <p class="card-text">
              <small class="text-body-secondary">{new Date(item.releaseDate).toDateString()}</small>
            </p>
            <button class="btn btn-primary">Book</button>
          </div>
        </div>
                )
            })
        }
      </div>
    </div>
  );
}

export default MovieCard;

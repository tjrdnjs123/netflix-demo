import React from "react";
import { Badge } from "react-bootstrap";
import "./MovieCard.style.css";
import { useMoviesGenreQuery } from "../../../../hooks/useMovieGenre";

const MovieCard = ({ movie }) => {
  const { data:genreData } = useMoviesGenreQuery();
  const showGenre=(genreIdList)=>{
    if(!genreData) return []
    const genreNameList = genreIdList.map((id)=>{
      const genreObj = genreData.find((genre)=>genre.id === id)
      return genreObj.name
    })
    return genreNameList
    
  }
  return (
    <div
      style={{
        backgroundImage:
          "url(" +
          `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}` +
          ")",
      }}
      className="movie-card"
    >
      <div className="overlay">
        <h1>{movie.title}</h1>
        {showGenre(movie.genre_ids).map((id) => (
          <Badge bg="danger">{id}</Badge>
        ))}
        <div>
          <div>
            <img
              src="https://i.pinimg.com/736x/dc/75/bb/dc75bbe02ac10b0032faacab46c5a662.jpg"
              className="vote-average-img"
            />
            {movie.vote_average}
          </div>
          <div>
            <img
              src="https://cdn-icons-png.freepik.com/512/5058/5058216.png"
              className="popularity-img"
            />
            {movie.popularity}
          </div>
          <div>
            <img
              src={movie.adult ? "https://t4.ftcdn.net/jpg/05/32/29/13/360_F_532291309_n3pSV78DUKV9uSajqR00x42xn7KFvaVv.jpg":"https://cdn-icons-png.flaticon.com/512/5622/5622900.png"}
              className="adult-img"
            />
            {movie.adult ? "18↑" : "All"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;

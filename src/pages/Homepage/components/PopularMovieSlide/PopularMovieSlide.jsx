import React from "react";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import { Alert } from "bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MovieCard from "../MovieCard/MovieCard";
import "./PopularMovieSlide.style.css";
import Spinner from "react-bootstrap/Spinner";

const PopularMovieSlide = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const { data, isLoading, isError, error } = usePopularMoviesQuery();
  console.log("popularmoviesdata", data);

  if (isLoading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
  if (isError) {
    return <Alert varient="danger">{error.message}</Alert>;
  }
  return (
    <div>
      <div className="popular-text">
        <h1>Popular Movies</h1>
      </div>
      <Carousel
        responsive={responsive}
        infinite={true}
        containerClass="carousel-container"
        itemClass="carousel-item-padding-40-px"
        centerMode={true}
      >
        {data.results.map((movie, index) => (
          <MovieCard movie={movie} key={index} />
        ))}
      </Carousel>
    </div>
  );
};

export default PopularMovieSlide;

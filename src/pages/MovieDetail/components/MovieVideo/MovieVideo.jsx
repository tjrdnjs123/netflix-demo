import React from "react";
import { useParams } from "react-router-dom";
import { useMovieVideoQuery } from "../../../../hooks/useMovieVideo";
import YouTube from "react-youtube";
import "./MovieVideo.style.css"

const MovieVideo = () => {
  const { id } = useParams();
  const { data  } = useMovieVideoQuery(Number(id));
  console.log("videoData", data);
  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };
  const videoId=data?.results && data.results[0].key
  return  <YouTube videoId={videoId} opts={opts}  className="youtube"/>;
};

export default MovieVideo;

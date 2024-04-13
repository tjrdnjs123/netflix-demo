import React from "react";
import { useParams } from "react-router-dom";
import { useMovieVideoQuery } from "../../../../hooks/useMovieVideo";
import YouTube from "react-youtube";

const MovieVideo = () => {
  const { id } = useParams();
  const { data  } = useMovieVideoQuery(Number(id));
  console.log("videoData", data);
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1,
    },
  };
  const videoId=data?.results && data.results[0].key
  return  <YouTube videoId={videoId} opts={opts}  />;
};

export default MovieVideo;

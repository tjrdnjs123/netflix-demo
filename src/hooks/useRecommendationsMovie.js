import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchRecommendationsMovie = ({id,page}) => {
  return api.get(`/movie/${id}/recommendations?page=${page}`);
};

export const useRecommendationsMovieQuery = ({id,page}) => {
  return useQuery({
    queryKey: ["movie-recommendations", {id,page}],
    queryFn: () => fetchRecommendationsMovie({id,page}),
    select: (result) => result.data,
  });
};

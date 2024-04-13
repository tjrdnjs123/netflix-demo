import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchReviewMovie = ({ id, page }) => {
  return api.get(`/movie/${id}/reviews?page=${page}`);
};

export const useReviewMovieQuery = ({ id, page }) => {
  return useQuery({
    queryKey: ["movie-review", { id, page }],
    queryFn: () => fetchReviewMovie({ id, page }),
    select: (result) => result.data,
  });
};

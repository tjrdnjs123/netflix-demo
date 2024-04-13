import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchDetailMovie = (id) => {
  return api.get(`/movie/${id}`);
};

export const useDetailMovieQuery = (id) => {
  return useQuery({
    queryKey: ["movie-detail" ,id ],
    queryFn: () => fetchDetailMovie(id),
    select: (result) => result.data,
  });
};

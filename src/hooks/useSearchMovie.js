import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";
const fetchSearchMovie = ({ keyword ,page }) => {
    console.log('keyword가있다', keyword)
  return keyword
    ? api.get(`/search/movie?query=${keyword}&page=${page}`)
    : api.get(`/movie/popular?page=${page}`);
};

export const useSearchMovieQuery = ({ keyword , page , sortedLow , genreId}) => {
  return useQuery({
    queryKey: ["movie-search",{keyword , page}],
    queryFn: () => fetchSearchMovie({ keyword ,page}),
    
    select: (result) => {
      if (genreId){
        const selectedMovies = result.data.results.filter(movie => movie.genre_ids.includes(genreId));
        return { ...result.data, results: selectedMovies };
      }
      if (sortedLow) {
        const sortedResults = result.data.results.slice().sort((a, b) => a.popularity - b.popularity);
        return { ...result.data, results: sortedResults };
      } else {
        return result.data;
      }
    }
  });
};

import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { getMovies } from ".././api/api";
import { MoviesForList } from "./MoviesForList";

interface MovieItemInterface {
  key: string;
  title: string;
  genres: string[];
  poster: string;
  backdrop: string;
  rating: number;
  description: string;
  releaseDate: string;
}
export const MovieList = () => {
  const [movies, setMovies] = useState([]);

  const fetchData = async () => {
    const movies = await getMovies();
    setMovies(movies);
    // movies.map((e: Movie) => console.log(e.genres));
  };

  ///HAHAHAHAHAHHAHAHAHA KOJI JOKE OMFG.........................................
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <FlatList
      data={movies}
      keyExtractor={(movie: MovieItemInterface) => movie.key}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={(movie) => <MoviesForList movie={movie}></MoviesForList>}
    ></FlatList>
  );
};

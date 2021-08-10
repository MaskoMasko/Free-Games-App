import { API_KEY } from "../config";

const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc`;
const getImagePath = (path: string) =>
  `https://image.tmdb.org/t/p/w440_and_h660_face${path}`;
const getBackdropPath = (path: string) =>
  `https://image.tmdb.org/t/p/w370_and_h556_multi_faces${path}`;

export const getMovies = async () => {
  const { results } = await fetch(API_URL).then((x) => x.json());
  const movies = results.map(
    ({
      id,
      original_title,
      poster_path,
      backdrop_path,
      vote_average,
      overview,
      release_date,
      genre_ids,
    }: {
      id: number;
      original_title: string;
      poster_path: string;
      backdrop_path: string;
      vote_average: number;
      overview: string;
      release_date: string;
      genre_ids: any[];
    }) => ({
      key: String(id),
      title: original_title,
      poster: getImagePath(poster_path),
      backdrop: getBackdropPath(backdrop_path),
      rating: vote_average,
      description: overview,
      releaseDate: release_date,
      genre_ids: genre_ids,
    })
  );
  return movies;
};

export const getFilteredMovies = async (url: string) => {
  const { results } = await fetch(url).then((x) => x.json());
  const movies = results.map(
    ({
      id,
      original_title,
      poster_path,
      backdrop_path,
      vote_average,
      overview,
      release_date,
      genre_ids,
    }: {
      id: number;
      original_title: string;
      poster_path: string;
      backdrop_path: string;
      vote_average: number;
      overview: string;
      release_date: string;
      // genre_ids: GenreId[];
      genre_ids: any[];
    }) => ({
      key: String(id),
      title: original_title,
      poster: getImagePath(poster_path),
      backdrop: getBackdropPath(backdrop_path),
      rating: vote_average,
      description: overview,
      releaseDate: release_date,
      //tu rabi dojti niki key value idk kako se stavi
      // genres: genre_ids.map((genre) => {
      //   for (let g of genres) {
      //     if (genre == g.key) return g;
      //   }
      // }),
      genre_ids: genre_ids,
    })
  );
  return movies;
};

export const getMoviesByGenre = async (url: string) => {
  const { results } = await fetch(url).then((x) => x.json());
  const movies = results.map(
    ({
      id,
      original_title,
      poster_path,
      backdrop_path,
      vote_average,
      overview,
      release_date,
      genre_ids,
    }: {
      id: number;
      original_title: string;
      poster_path: string;
      backdrop_path: string;
      vote_average: number;
      overview: string;
      release_date: string;
      // genre_ids: GenreId[];
      genre_ids: any[];
    }) => ({
      key: String(id),
      title: original_title,
      poster: getImagePath(poster_path),
      backdrop: getBackdropPath(backdrop_path),
      rating: vote_average,
      description: overview,
      releaseDate: release_date,
      //tu rabi dojti niki key value idk kako se stavi
      genre_ids: genre_ids,
    })
  );
  return movies;
};

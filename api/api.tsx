import { API_KEY } from "../config";
const genres = [
  { key: 12, genre: "Adventure" },
  { key: 14, genre: "Fantasy" },
  { key: 16, genre: "Animation" },
  { key: 18, genre: "Drama" },
  { key: 27, genre: "Horror" },
  { key: 28, genre: "Action" },
  { key: 35, genre: "Comedy" },
  { key: 36, genre: "History" },
  { key: 37, genre: "Western" },
  { key: 53, genre: "Thriller" },
  { key: 80, genre: "Crime" },
  { key: 99, genre: "Documentary" },
  { key: 878, genre: "Science Fiction" },
  { key: 9648, genre: "Mystery" },
  { key: 10402, genre: "Music" },
  { key: 10749, genre: "Romance" },
  { key: 10751, genre: "Family" },
  { key: 10770, genre: "TV Movie" },
  // "12": "Adventure",
  // "14": "Fantasy",
  // "16": "Animation",
  // "18": "Drama",
  // "27": "Horror",
  // "28": "Action",
  // "35": "Comedy",
  // "36": "History",
  // "37": "Western",
  // "53": "Thriller",
  // "80": "Crime",
  // "99": "Documentary",
  // "878": "Science Fiction",
  // "9648": "Mystery",
  // "10402": "Music",
  // "10749": "Romance",
  // "10751": "Family",
  // "10752": "War",
  // "10770": "TV Movie",
];

// type GenreId = keyof typeof genres;

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
      //genres mora biti array sa obj key i genre
      genres: genre_ids.map((genre) => {
        for (let g of genres) {
          if (genre == g.key) return g;
        }
      }),
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
      genres: genre_ids.map((genre) => {
        for (let g of genres) {
          if (genre == g.key) return g;
        }
      }),
    })
  );
  return movies;
};

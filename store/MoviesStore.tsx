import { Instance, flow, getRoot, types } from "mobx-state-tree";
import { getFilteredMovies, getMovies, getMoviesByGenre } from "../api/api";
import { API_KEY } from "../config";
import { BeforeMovieInterface } from "../api/api";

const {
  string,
  identifierNumber,
  model,
  number,
  array,
  safeReference,
  identifier,
  map,
  maybe,
  boolean,
} = types;

export const GenreModel = model({
  id: identifierNumber,
  name: string,
});

export const BeforeMovie = model({
  id: number,
  original_title: maybe(string),
  poster_path: maybe(string),
  backdrop_path: maybe(string),
  vote_average: number,
  overview: string,
  release_date: maybe(string),
  genre_ids: array(number),
});

export const MovieModel = model("Movie", {
  key: identifier,
  title: string,
  poster: string,
  backdrop: string,
  rating: number,
  description: string,
  releaseDate: maybe(string),
  genre_ids: array(safeReference(GenreModel, { acceptsUndefined: false })),
}).actions((self) => {
  return {
    addToFavorites() {
      const root: any = getRoot(self);
      root.addFavoriteMovie(self.key);
    },
  };
});

export const ActorsModel = model({
  adult: maybe(boolean),
  gender: maybe(number),
  id: maybe(number),
  known_for: array(BeforeMovie),
  known_for_department: maybe(string),
  name: maybe(string),
  popularity: maybe(number),
  profile_path: types.maybeNull(string),
});

const MovieStore = model("MovieStore", {
  allGenres: map(GenreModel),
  allMovies: map(MovieModel),

  selectedMovie: safeReference(MovieModel),
  favoriteMoviesList: array(
    safeReference(MovieModel, { acceptsUndefined: false })
  ),
  filteredMovies: array(safeReference(MovieModel, { acceptsUndefined: false })),
  filteredMoviesByGenre: array(
    safeReference(MovieModel, { acceptsUndefined: false })
  ),
  allActors: array(ActorsModel),

  watchedMovies: array(safeReference(MovieModel, { acceptsUndefined: false })),
  bestRatedMovie: safeReference(MovieModel),

  genreId: 0,
  genreName: "",
  pageNumber: 1,
  genrePageNumber: 1,
  actorsPageNumber: 1,

  ima: false,
})
  .views((self) => {
    return {
      get movieList() {
        const splicedMovies = [...self.allMovies.values()];
        return splicedMovies.splice(0, 20);
      },
      get genreList(): Instance<typeof GenreModel>[] {
        return [...store.allGenres.values()];
      },
    };
  })
  .actions((self) => ({
    process(data: any): any {
      const dataList = Array.from(data);
      const mapped = dataList.map((e: any) => {
        return self.allMovies.put(e);
      });
      return Array.isArray(data) ? mapped : mapped[0];
    },
  }))

  .actions((self) => ({
    processGenre(data: any): any {
      const dataList = Array.from(data);
      const mapped = dataList.map((e: any) => {
        return self.allGenres.put(e);
      });
      return Array.isArray(data) ? mapped : mapped[0];
    },
  }))
  .actions((self) => {
    return {
      setSelectedMovie(movieKey: any) {
        self.selectedMovie = movieKey;
        if (self.watchedMovies.includes(self.selectedMovie)) {
          let index = self.watchedMovies.lastIndexOf(self.selectedMovie);
          self.watchedMovies.splice(index, 1);
        }
        self.watchedMovies.push(self.selectedMovie!);
      },
      setGenre(genre: { id: number; name: string }) {
        self.genreId = genre.id;
        self.genreName = genre.name;
      },
      addFavoriteMovie(movieKey: any) {
        self.favoriteMoviesList.push(movieKey);
        const uniques = [...new Set([...self.favoriteMoviesList])];
        if (self.favoriteMoviesList.length == uniques.length) {
          self.ima = false;
        } else {
          self.ima = true;
          self.favoriteMoviesList = uniques;
        }
      },
      removeFavoriteMovie(id: number) {
        self.favoriteMoviesList.splice(id, 1);
      },
      getBestRatedMovie(rating: number) {
        for (const movie of self.movieList) {
          if (movie.rating == rating) {
            self.bestRatedMovie = movie.key;
          }
        }
      },
      increasePageNumber() {
        if (self.filteredMovies.length == 0) return;
        self.pageNumber += 1;
      },
      increaseGenrePageNumber() {
        if (self.filteredMoviesByGenre.length == 0) return;
        self.genrePageNumber += 1;
      },
      increaseActorsPageNumber() {
        if (self.allActors.length == 0) return;
        self.actorsPageNumber += 1;
      },
      decreaseActorsPageNumber() {
        if (self.actorsPageNumber == 1) return;
        self.actorsPageNumber -= 1;
      },
      decreasePageNumber() {
        if (self.pageNumber == 1) return;
        self.pageNumber -= 1;
      },
      decreaseGenrePageNumber() {
        if (self.genrePageNumber == 1) return;
        self.genrePageNumber -= 1;
      },
      resetGenrePageNumber() {
        self.genrePageNumber = 1;
      },
      resetPageNumber() {
        self.pageNumber = 1;
      },
      fetchGenreList: flow(function* fetchGenreList() {
        const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`;

        const data = yield fetch(url).then((r) => r.json());
        return self.processGenre(data.genres);
      }),
      fetchData: flow(function* fetchData() {
        const moviesListData = yield getMovies();
        for (let movie of moviesListData) {
          self.allMovies.put(movie);
        }
        return self.process(moviesListData);
      }),
      fetchFilteredMovies: flow(function* fetchFilteredMovies(inputValue) {
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${inputValue}&page=${self.pageNumber}`;

        const moviesListData = yield getFilteredMovies(url);
        const normalized = self.process(moviesListData);
        self.filteredMovies = normalized.map(
          (movie: { key: string }) => movie.key
        );
        return normalized;
      }),
      fetchMoviesByGenre: flow(function* fetchMoviesByGenre(genreKey) {
        const genres = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreKey}&page=${self.genrePageNumber}`;
        const moviesListData = yield getMoviesByGenre(genres);
        const normalized = self.process(moviesListData);
        self.filteredMoviesByGenre = normalized.map(
          (movie: { key: string }) => movie.key
        );
        return normalized;
      }),
      fetchUpcomingMovies: flow(function* fetchUpcomingMovies() {
        let allMovies;
        let nisto = [];
        for (let i = 1; i < 20; i++) {
          allMovies = yield fetch(
            `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${i}`
          ).then((x) => x.json());
          nisto.push(allMovies.results);
        }
        return nisto;
      }),
      fetchActors: flow(function* fetchActors() {
        const url = `https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}&language=en-US&page=${self.actorsPageNumber}`;
        const moviesListData = yield fetch(url).then((x) => x.json());
        for (let i = 0; i < moviesListData.results.length; i++) {
          self.allActors.push(moviesListData.results[i]);
        }
        return moviesListData.results;
      }),
    };
  });
export const store = MovieStore.create({});

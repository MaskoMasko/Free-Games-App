import { flow, getRoot, types } from "mobx-state-tree";
import { getFilteredMovies, getMovies, getMoviesByGenre } from "../api/api";
import { API_KEY } from "../config";

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
} = types;

const GenreModel = model({
  id: identifierNumber,
  name: string,
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
  genreId: 0,
  genreName: "",
  pageNumber: 1,
  genrePageNumber: 1,
})
  .views((self) => {
    return {
      get movieList() {
        const splicedMovies = [...self.allMovies.values()];
        return splicedMovies.splice(0, 20);
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
      },
      setGenre(genre: { id: number; name: string }) {
        self.genreId = genre.id;
        self.genreName = genre.name;
      },
      addFavoriteMovie(movieKey: any) {
        self.favoriteMoviesList.push(movieKey);
      },
      removeFavoriteMovie(id: number) {
        self.favoriteMoviesList.splice(id, 1);
      },
      increasePageNumber() {
        self.pageNumber += 1;
      },
      increaseGenrePageNumber() {
        self.genrePageNumber += 1;
      },
      decreasePageNumber() {
        if (self.pageNumber == 1) return;
        self.pageNumber -= 1;
      },
      decreaseGenrePageNumber() {
        if (self.genrePageNumber == 1) return;
        self.genrePageNumber -= 1;
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
    };
  });

export const store = MovieStore.create({});

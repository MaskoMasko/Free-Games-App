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
  releaseDate: string,
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
      setSelectedMovie(movieKey: any) {
        self.selectedMovie = movieKey;
      },
      setOneFatNothing(genre: any) {
        self.genreId = genre.id;
        self.genreName = genre.name;
      },
      addFavoriteMovie(movieKey: any) {
        self.favoriteMoviesList.push(movieKey);
      },
      removeFavoriteMovie(id: number) {
        self.favoriteMoviesList.splice(id, 1);
      },
      fetchFilteredMovies: flow(function* fetchFilteredMovies(inputValue) {
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${inputValue}`;

        const moviesListData = yield getFilteredMovies(url);

        for (let i = 0; i < moviesListData.length; i++) {
          //stavlja sve filmove tamo unutra
          self.allMovies.put(moviesListData[i]);
        }
        //dobija samo keyeve jer je refrence gori
        self.filteredMovies = moviesListData.map(
          (movie: { key: string }) => movie.key
        );
        return self.process(moviesListData);
      }),
      fetchMoviesByGenre: flow(function* fetchMoviesByGenre(genreKey) {
        const genres = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreKey}`;
        const moviesListData = yield getMoviesByGenre(genres);
        for (let i = 0; i < moviesListData.length; i++) {
          self.allMovies.put(moviesListData[i]);
        }
        self.filteredMoviesByGenre = moviesListData.map(
          (movie: { key: string }) => movie.key
        );
        return self.process(moviesListData);
      }),
    };
  });

export const store = MovieStore.create({});

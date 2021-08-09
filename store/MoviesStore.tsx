import { flow, getRoot, types } from "mobx-state-tree";
import { getFilteredMovies, getMovies } from "../api/api";
import { API_KEY } from "../config";

const MovieModel = types
  .model("Movie", {
    key: types.identifier,
    title: types.string,
    poster: types.string,
    backdrop: types.string,
    rating: types.number,
    description: types.string,
    releaseDate: types.maybe(types.string),
    genres: types.array(types.string),
  })
  .actions((self) => {
    return {
      addToFavorites() {
        const root: any = getRoot(self);
        root.addFavoriteMovie(self.key);
      },
    };
  });

const MovieStore = types
  .model("MovieStore", {
    allMovies: types.map(MovieModel),

    selectedMovie: types.safeReference(MovieModel),
    favoriteMoviesList: types.array(
      types.safeReference(MovieModel, { acceptsUndefined: false })
    ),
    filteredMovies: types.array(
      types.safeReference(MovieModel, { acceptsUndefined: false })
    ),
  })
  .views((self) => {
    return {
      get movieList() {
        const splicedMovies = [...self.allMovies.values()];
        return splicedMovies.splice(0, 20);
      },
    };
  })
  .actions((self) => {
    return {
      fetchData: flow(function* fetchData() {
        const moviesListData = yield getMovies();
        for (let movie of moviesListData) {
          self.allMovies.put(movie);
        }
      }),
      setSelectedMovie(movieKey: any) {
        self.selectedMovie = movieKey;
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
      }),
    };
  });

export const store = MovieStore.create({});

import {
  types,
  flow,
  getSnapshot,
  onSnapshot,
  applySnapshot,
} from "mobx-state-tree";
import { getMovies } from "../api/api";

const MovieModel = types.model("Movie", {
  key: types.identifier,
  title: types.string,
  poster: types.string,
  backdrop: types.string,
  rating: types.number,
  description: types.string,
  releaseDate: types.string,
  genres: types.array(types.string),
});

const MovieStore = types
  .model("MovieStore", {
    movieList: types.array(MovieModel),
  })
  .actions((self) => {
    return {
      fetchData: flow(function* fetchData() {
        const moviesListData = yield getMovies();
        self.movieList = moviesListData;
      }),
    };
  });

export const store = MovieStore.create({
  movieList: [],
});

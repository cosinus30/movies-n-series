import { defaultAxios } from "./axios";
import { MovieResource } from "./movie-resource";

export const api = {
    movie: new MovieResource(defaultAxios)
}

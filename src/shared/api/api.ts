import { defaultAxios } from "./axios";
import { MovieResource } from "./movie-resource";
import { TVResource } from "./tv-resource";

export const api = {
    movie: new MovieResource(defaultAxios),
    tv: new TVResource(defaultAxios),
};

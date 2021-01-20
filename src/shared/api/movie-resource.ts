import axiosStatic, { AxiosInstance, AxiosRequestConfig } from "axios";
import { Credits, MovieDetail, Movies } from "../types/Movie";

export type movieListingTypes = "upcoming" | "popular" | "top_rated" | "now_playing" | "trending";
export class MovieResource {
    constructor(private axios: AxiosInstance = axiosStatic, private AxiosRequestConfig: AxiosRequestConfig = {}) {}

    getMovies = (type: movieListingTypes): Promise<Movies> => {
        return this.axios
            .get(`movie/${type}`, this.AxiosRequestConfig)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };

    getTrending = (): Promise<Movies> => {
        return this.axios
            .get("trending/movie/week", this.AxiosRequestConfig)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };

    getMovie = (id: string): Promise<MovieDetail> => {
        return this.axios
            .get(`movie/${id}`, this.AxiosRequestConfig)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };

    getCast = (id: string): Promise<Credits> => {
        return this.axios
            .get(`movie/${id}/credits`)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };

    getRecommendations = (id: string): Promise<Movies> => {
        return this.axios
            .get(`movie/${id}/recommendations`)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };

    getSimilar = (id: string): Promise<Movies> => {
        return this.axios
            .get(`movie/${id}/similar`)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };
}

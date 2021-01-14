import axiosStatic, { AxiosInstance, AxiosRequestConfig } from "axios";
import { MovieDetail, Movies } from "../types/Movie";

export class MovieResource {
    constructor(private axios: AxiosInstance = axiosStatic, private AxiosRequestConfig: AxiosRequestConfig = {}) {}

    getMovies = (type: string): Promise<Movies> => {
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
}

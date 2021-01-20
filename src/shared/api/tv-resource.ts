import axiosStatic, { AxiosInstance, AxiosRequestConfig } from "axios";
import { Credits, MovieDetail, Movies } from "../types/Movie";
import { TVDetail, TvListItem, TVListResult } from "../types/Tv";

export type tvListingTypes = "popular" | "top_rated" | "now_playing" | "trending" | "on_the_air";
export class TVResource {
    constructor(private axios: AxiosInstance = axiosStatic, private AxiosRequestConfig: AxiosRequestConfig = {}) {}

    getSeries = (type: tvListingTypes): Promise<TVListResult> => {
        return this.axios
            .get(`tv/${type}`, this.AxiosRequestConfig)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };

    getTrending = (): Promise<TVListResult> => {
        return this.axios
            .get(`trending/tv/week`, this.AxiosRequestConfig)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };

    getTvShow = (id: string): Promise<TVDetail> => {
        return this.axios
            .get(`tv/${id}`, this.AxiosRequestConfig)
            .then((response) => response.data)
            .catch((err) => err);
    };
}

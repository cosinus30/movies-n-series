import axiosStatic, { AxiosRequestConfig } from "axios";

const baseUrl = "https://api.themoviedb.org/3/";
const posterPathExtension = "t/p/original/";

const defaultConfig: AxiosRequestConfig = {
    params: {
        api_key: "f13f14b739ac2df73bbb60f84478dcc0",
    },
    baseURL: baseUrl,
};

function createAxios(baseConfig: AxiosRequestConfig) {
    const instance = axiosStatic.create(baseConfig);

    return instance;
}

export const defaultAxios = createAxios(defaultConfig);

import { Genre, SummarizedItem } from "./Common";

export interface TVListResult {
    page: number;
    total_results: number;
    total_pages: number;
    results: SummarizedItem[];
}

export interface Season {
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
}

export interface TVDetail {
    backdrop_path: string;
    episode_run_time: number[];
    first_air_date: string;
    genres: Genre[];
    id: number;
    name: string;
    number_of_episodes: number;
    number_of_seasons: number;
    overview: string;
    popularitiy: number;
    seasons: Season[];
    status: string;
    tagline: string;
    type: string;
    vote_average: string;
}

export interface Episode {
    air_date: string;
    episode_number: number;
    id: number;
    name: string;
    overview: string;
    vote_average: number;
    still_path: string;
}

export interface SeasonDetail extends Season {
    episodes: Episode[];
}

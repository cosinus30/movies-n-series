import { Genre, SummarizedItem } from "./Common";
export interface Movies {
    results: SummarizedItem[];
    page: number;
    total_results: number;
    total_pages: number;
}
export interface MovieDetail {
    title: string;
    original_title: string;
    release_date: string;
    overview: string;
    popularity: number;
    genres: Genre[];
    vote_average: number;
    tagline: string;
    backdrop_path: string;
}

export interface Person {
    name: string;
    profile_path: string;
    character: string;
    id: number;
}

export interface Credits {
    cast: Person[];
    crew: Person[];
}

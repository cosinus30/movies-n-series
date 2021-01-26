export interface SummarizedItem {
    poster_path: string;
    original_title: string;
    title: string;
    popularity: number;
    overview: string;
    id: number;
    name?: string;
}

export interface Genre {
    id: number;
    name: string;
}

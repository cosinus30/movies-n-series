export interface Movie {
    poster_path: string,
    original_title: string,
    title: string,
    popularity: number,
    overview: string,
    id: number,
}

export interface Movies {
    results: Movie[],
    page: number,
    total_results: number,
    total_pages: number
}

export interface Genre {
    id: number,
    name: string
}

export interface MovieDetail {
    title: string,
    original_title: string,
    release_date: string,
    overview: string,
    popularity: number,
    genres: Genre[],
    vote_average: number,
    tagline: string,
    backdrop_path: string,
}

export interface Person {
    name: string,
    profile_path: string,
    character: string,
    id: number,
}

export interface Credits {
    cast: Person[],
    crew: Person[],
}

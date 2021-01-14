export type Movie = {
    poster_path: string,
    original_title: string,
    title: string,
    popularity: number,
    id: number,
}

export type Movies = {
    results: Movie[],
    page: number,
    total_results: number,
    total_pages: number
}

export type MovieDetail = {
    
}
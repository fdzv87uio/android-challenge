export interface Series {
    id: number;
    name: string;
    image: {
        medium: string;
        original: string;
    };
    summary: string;
    genres: string[];
    schedule: {
        time: string;
        days: string[];
    };
}

export interface Episode {
    id: number;
    name: string;
    season: number;
    number: number;
    summary: string;
    image: {
        medium: string;
        original: string;
    };
}
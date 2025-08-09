import axios from 'axios';

const TVMazeAPI = axios.create({
    baseURL: 'https://api.tvmaze.com',
    timeout: 10000,
});

export const fetchSeriesByPage = (page: number) => {
    return TVMazeAPI.get(`/shows?page=${page}`);
};

export const searchSeriesByName = (query: string) => {
    return TVMazeAPI.get(`/search/shows?q=${query}`);
};

export const fetchSeriesDetails = (id: number) => {
    return TVMazeAPI.get(`/shows/${id}`);
};

export const fetchSeriesEpisodes = (id: number) => {
    return TVMazeAPI.get(`/shows/${id}/episodes`);
};

export default TVMazeAPI;
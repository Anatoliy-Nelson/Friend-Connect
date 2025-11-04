import axios from 'axios'

export const newsAPI = {
    getNews: (page: number, pageSize: number, country: string = 'us', category: string = '', search: string = '') => {
        return axios.get<newsResponse>(
            `https://newsapi.org/v2/top-headlines?page=${page}&pageSize=${pageSize}&country=${country}&q=${search}&category=${category}&apiKey=0cf1e11d29844bf3b420111e32430e4a`
        )
    }
}

export type Source = {
    id?: any;
    name: string;
}

export type Articles = {
    source: Source;
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}

export type newsResponse = {
    status: string;
    totalResults: number;
    articles: Articles[];
}

export type FilterNewsForm = {
    country: string
    category: string
    search: string
}

export type SelectItem = {
    id: string
    name: string
}

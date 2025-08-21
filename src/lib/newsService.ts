// src/lib/newsService.ts
import { news as initialNews } from "@/data/news";

export type TNews = {
    id: string;
    title: string;
    summary: string;
    content: string;
    image_url?: string;
    published_date: string;
    is_featured?: boolean;
    tags?: string[];
};

const NEWS_KEY = 'labind-news';

const getNews = (): TNews[] => {
    try {
        const newsJson = localStorage.getItem(NEWS_KEY);
        if (newsJson) {
            return JSON.parse(newsJson);
        } else {
            localStorage.setItem(NEWS_KEY, JSON.stringify(initialNews));
            return initialNews;
        }
    } catch (error) {
        console.error("Failed to parse news from localStorage", error);
        return initialNews;
    }
};

const saveNews = (news: TNews[]) => {
    localStorage.setItem(NEWS_KEY, JSON.stringify(news));
};

export const listNews = (): TNews[] => {
    return getNews();
};

export const addNews = (newsItem: Omit<TNews, 'id'>) => {
    const news = getNews();
    const newNewsItem: TNews = {
        ...newsItem,
        id: new Date().getTime().toString()
    };
    const updatedNews = [...news, newNewsItem];
    saveNews(updatedNews);
    return newNewsItem;
};

export const deleteNews = (id: string) => {
    const news = getNews();
    const updatedNews = news.filter(n => n.id !== id);
    saveNews(updatedNews);
};
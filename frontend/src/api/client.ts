import axios, { type AxiosRequestConfig } from 'axios';
import newsEn from '../../../backend/app/data/news_en.json';
import newsZh from '../../../backend/app/data/news_zh.json';
import profileEn from '../../../backend/app/data/profile_en.json';
import profileZh from '../../../backend/app/data/profile_zh.json';
import publications from '../../../backend/app/data/publications.json';
import researchEn from '../../../backend/app/data/research_en.json';
import researchZh from '../../../backend/app/data/research_zh.json';
import social from '../../../backend/app/data/social.json';
import travels from '../../../backend/app/data/travels.json';
import blogsEn from '../../../backend/app/data/blogs_en.json';
import blogsZh from '../../../backend/app/data/blogs_zh.json';
import profileImage from '../../../backend/app/data/images/profile.jpg';

// API base URL - defaults to localhost for development
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const USE_STATIC_DATA = import.meta.env.VITE_STATIC_SITE === 'true';

type ApiClient = {
  get<T>(url: string, config?: AxiosRequestConfig): Promise<{ data: T }>;
};

const localizedData = {
  news: { en: newsEn, zh: newsZh },
  profile: { en: profileEn, zh: profileZh },
  research: { en: researchEn, zh: researchZh },
  blogs: { en: blogsEn, zh: blogsZh },
} as const;

const staticApi = {
  async get<T>(url: string, _config?: AxiosRequestConfig): Promise<{ data: T }> {
    const requestUrl = new URL(url, window.location.origin);
    const lang = requestUrl.searchParams.get('lang') === 'en' ? 'en' : 'zh';
    const path = requestUrl.pathname.replace(/^\/api\//, '');

    const data = (() => {
      switch (path) {
        case 'news':
          return localizedData.news[lang];
        case 'profile':
          return localizedData.profile[lang];
        case 'research':
          return localizedData.research[lang];
        case 'blogs':
          return localizedData.blogs[lang];
        case 'publications':
          return publications;
        case 'social-links':
          return social;
        case 'travels':
          return travels;
        default:
          throw new Error(`Static data not found for ${url}`);
      }
    })();

    return { data: data as T };
  },
};

// Create axios instance with default config
const axiosApi = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosApi.interceptors.request.use(
  (config) => {
    // You can add auth tokens here if needed in the future
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle errors globally
    if (error.response) {
      // Server responded with error status
      console.error('API Error:', error.response.status, error.response.data);
    } else if (error.request) {
      // Request made but no response received
      console.error('Network Error:', error.message);
    } else {
      // Something else happened
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export const api: ApiClient = USE_STATIC_DATA ? staticApi : axiosApi;
export const profileImageUrl = USE_STATIC_DATA ? profileImage : `${BASE_URL}/api/profile-image`;

export default api;

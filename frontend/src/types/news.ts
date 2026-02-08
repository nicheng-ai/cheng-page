export interface NewsItem {
  id: number;
  date: string;
  date_full: string;
  content: string;
  type: 'milestone' | 'talk' | 'project' | 'award';
}

export interface NewsResponse {
  items: NewsItem[];
}

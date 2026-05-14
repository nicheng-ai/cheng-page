export interface BlogPost {
  id: string;
  title: string;
  date: string;
  summary: string;
  content: string;
  imageUrl?: string;
}

export interface BlogsResponse {
  items: BlogPost[];
}
export interface Publication {
  id: number;
  title: string;
  title_en: string;
  authors: string;
  venue: string;
  venue_short: string;
  year: number;
  url: string;
  tags: string[];
}

export interface PublicationsResponse {
  items: Publication[];
}

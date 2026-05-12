export interface SocialLink {
  name: string;
  name_en: string;
  url: string;
  icon: string;
}

export interface SocialLinksResponse {
  links: SocialLink[];
}

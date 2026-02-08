export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface SocialLinksResponse {
  links: SocialLink[];
}

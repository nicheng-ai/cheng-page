export interface Institution {
  name: string;
  url: string;
}

export interface Profile {
  name: string;
  name_chinese: string;
  name_english: string;
  title: string;
  institution: Institution;
  university?: Institution;
  email: string;
  bio: string;
  goal: string;
  image_filename: string;
}

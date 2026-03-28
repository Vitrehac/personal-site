export type Locale = "en" | "cs";

export interface ContentMeta {
  title: string;
  date: string;
  slug: string;
  excerpt?: string;
  coverImage?: string;
  category?: string;
  tags?: string[];
  location?: string;
  language?: Locale;
  featured?: boolean;
}

export interface ProjectMeta extends ContentMeta {
  category: string;
  tags: string[];
  startup?: string;
  topic?: string;
}

export interface WorkMeta extends ContentMeta {
  role?: string;
  organization?: string;
  period?: string;
}

export interface PhotoMeta extends ContentMeta {
  album?: string;
  camera?: string;
  aspectRatio?: "landscape" | "portrait" | "square";
}

export interface TimelineEvent extends ContentMeta {
  category: string;
  link?: string;
  icon?: string;
}

export interface ContentEntry<T extends ContentMeta = ContentMeta> {
  meta: T;
  content: string;
}

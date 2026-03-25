export type Project = {
  slug: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  detail?: {
    heroImage?: string;
    features?: { title: string; desc: string }[];
    techStack?: string[];
    appStoreUrl?: string;
    demoUrl?: string;
  };
};

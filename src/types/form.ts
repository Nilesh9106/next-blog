export type BlogForm = {
  title: string;
  description: string;
  content: string;
  slug: string;
  image?: string;
  keywords?: string[];
};

export type LoginForm = {
  username: string;
  password: string;
};

export type SignupForm = {
  username: string;
  email: string;
  password: string;
};

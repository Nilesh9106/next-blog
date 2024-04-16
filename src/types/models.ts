export type BlogType = {
  title: string;
  description: string;
  content: string;
  slug: string;
  image?: string;
  likedBy?: string[];
  keywords?: string[];
  comments?: string[];
  createdAt?: string;
  updatedAt?: string;
};
export type BlogTypeWithComments = {
  title: string;
  description: string;
  content: string;
  slug: string;
  image?: string;
  keywords?: string[];
  likedBy?: UserType[];
  comments?: CommentType[];
  createdAt?: string;
  updatedAt?: string;
};
export type CommentType = {
  content: string;
  user: UserType;
  createdAt?: string;
  updatedAt?: string;
};
export type UserType = {
  name: string;
  email: string;
  password: string;
  createdAt?: string;
  updatedAt?: string;
};

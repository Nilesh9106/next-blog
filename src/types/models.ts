export type BlogType = {
  _id: string;
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
  _id: string;
  title: string;
  description: string;
  content: string;
  slug: string;
  image?: string;
  keywords?: string[];
  likedBy?: string[];
  comments?: CommentType[];
  createdAt?: string;
  updatedAt?: string;
};
export type CommentType = {
  _id: string;
  content: string;
  user: UserType;
  createdAt?: string;
  updatedAt?: string;
};
export type UserType = {
  _id: string;
  username: string;
  email: string;
  password: string;
  createdAt?: string;
  updatedAt?: string;
};

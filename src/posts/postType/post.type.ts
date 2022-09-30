export type CreatePostType = {
  title: string;
  description: string;
  image?: string;
}

export type UpdatePostType = {
  title?: string;
  description?: string;
  image?: string;
}
import { ReactNode } from "react";

export interface IPost {
  user_avatar: string;
  user_last_name: ReactNode;
  content: string;
  created_at: string;
  id: number;
  count: number;
  initialPosts: string;
  user_id:number;
}

export type IResponseGetPost = {
  count: number;
  posts: IPost[];
 
};

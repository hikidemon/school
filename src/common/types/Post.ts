export interface Post {
  id: number;
  title: string;
  content?: string;
  date: string;
  image?: string 
  type?: string;
  likes?:number
  isLikedByUser?: boolean;
}

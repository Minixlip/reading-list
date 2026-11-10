export interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  is_read: boolean;
  pages?: number;
}

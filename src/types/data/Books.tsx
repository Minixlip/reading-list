export interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  is_read: boolean;
  pages?: number;
  pages_read?: number;
  rating?: number;
  review?: string;
}

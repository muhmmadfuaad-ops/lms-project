export interface Course {
  id: number;
  title: string;
  description?: string | null;
  credits: number;
  price: number;
  currency: string;
}

export interface Student {
  id: number;
  name: string;
  email: string;
  // Optional fields
  password?: string;
  age?: number | null;
  phone_number?: string | null;
  address?: string | null;
  enrollment_date?: string | Date | null;
}

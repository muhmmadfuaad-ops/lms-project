export class CreateStudentDto {
  name: string;
  email: string;
  password: string;
  // Optional fields
  age?: number;
  phone_number?: string;
  address?: string;
  enrollment_date?: string | Date;
}

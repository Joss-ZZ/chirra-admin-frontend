import { Profile } from ".";

export interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: number;
  createdAt: string | Date;
  profiles: Profile;
}
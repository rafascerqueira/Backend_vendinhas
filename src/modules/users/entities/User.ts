import { v4 as uuidV4 } from "uuid";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";

export class User {
  readonly id: string;

  name: string;

  email: string;

  role: string;

  password: string;

  created_at?: Date;

  updated_at?: Date;

  constructor({ name, email, password }: ICreateUserDTO, role?: string) {
    this.id = uuidV4();
    this.name = name;
    this.email = email;
    this.role = "user" || role;
    this.password = password;
  }
}

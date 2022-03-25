export class User {
  readonly id: string;

  name: string;

  email: string;

  role: string;

  password: string;

  created_at: Date;

  updated_at: Date;

  constructor(
    id: string,
    name: string,
    email: string,
    role: string,
    password: string,
    created_at: Date,
    updated_at: Date
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;
    this.password = password;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}

export type CreateUserType = {
  name: string;
  email: string;
  password: string;
}

export type UpdateUserType = {
  name?: string;
  email?: string;
  password?: string;
}

export type LoginUserType = {
  email: string;
  password: string;
}
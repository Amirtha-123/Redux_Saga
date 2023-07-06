export interface IUsersResponse {
  data: IUser[];
  total: number;
  page: number;
  limit: number;
}

export interface IUser {
  id?: string;
  title?: "ms" | "miss" | "mr" | "mrs";
  firstName: string;
  lastName: string;
  email: string;
  picture?: string;
}

export interface IUserReducer extends Omit<IUsersResponse, "data"> {
  loading?: boolean;
  error?: string | null;
  users: IUser[];
}
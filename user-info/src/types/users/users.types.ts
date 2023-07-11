export interface IUsersResponse {
  data: IUser[];
  total: number;
  page: number;
  limit: number;
}
export interface IUser {
  id?: undefined;
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  picture?: string;
}
export interface IUserUpdate {
  isUpdated: boolean;
  isUpdateLoading: boolean;
}
export interface IUserDelete {
  isDelete: boolean;
  isDeleteLoading: boolean;
}
export interface IUserReducer
  extends Omit<IUsersResponse, "data">,
    IUserUpdate,
    IUserDelete {
  isLoading?: boolean;
  error?: string | null;
  users: IUser[];
  currentUser: IUser | null;
}

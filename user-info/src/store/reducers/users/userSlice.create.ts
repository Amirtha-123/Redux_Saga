import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IUser,
  IUserReducer,
  IUsersResponse,
} from "../../../types/users/users.types";

const initialState: IUserReducer = {
  users: [],
  loading: false,
  error: null,
  page: 1,
  total: 0,
  limit: 20,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    createUserStart: (state: IUserReducer) => {
      return {
        ...state,
        loading: true,
        error: null,
      };
    },
    createUserSuccess: (state: IUserReducer, action: PayloadAction<IUser>) => {
      return {
        ...state,
        loading: false,
        users: [...state.users, action.payload],
        error: null,
      };
    },
    createUserFailure: (state: IUserReducer, action: PayloadAction<string>) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    createUserReset: (state: IUserReducer) => {
      return {
        ...state,
        loading: false,
        users: [],
        error: null,
      };
    },
    getUsersStart: (state: IUserReducer) => {
      return {
        ...state,
        loading: true,
        error: null,
      };
    },
    getUsersSuccess: (
      state: IUserReducer,
      action: PayloadAction<IUsersResponse>
    ) => {
      const { data } = action.payload;
      return {
        ...state,
        loading: false,
        users: data,
        error: null,
      };
    },
    getUsersFailure: (state: IUserReducer, action: PayloadAction<string>) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    deleteUser: (state: IUserReducer, action: PayloadAction<string>) => {
      const userId = action.payload;
      const updatedUsers = state.users.filter((user) => user.id !== userId);
      return {
        ...state,
        loading: false,
        users: updatedUsers,
        error: null,
      };
    },
    deleteUserSuccess: (state: IUserReducer) => {
      return {
        ...state,
        successMessage: "User deleted successfully",
        error: null,
      };
    },
    deleteUserFailure: (state: IUserReducer, action: PayloadAction<string>) => {
      return {
        ...state,
        error: action.payload,
      };
    },
    editUserStart: (state: IUserReducer) => {
      return {
        ...state,
        loading: true,
        error: null,
      };
    },
    editUserSuccess: (state: IUserReducer, action: PayloadAction<IUser>) => {
      const updatedUsers = state.users.map((user) =>
        user.id === action.payload.id ? action.payload : user
      );

      return {
        ...state,
        loading: false,
        users: updatedUsers,
        error: null,
      };
    },
    editUserFailure: (state: IUserReducer, action: PayloadAction<string>) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
  },
});

export default userSlice;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IUser,
  IUserReducer,
  IUsersResponse,
} from "../../../types/users/users.types";

const initialState: IUserReducer = {
  users: [],
  isLoading: false,
  error: null,
  page: 1,
  total: 0,
  limit: 20,
  currentUser: null,
  isUpdated: false,
  isUpdateLoading: false,
  isDelete: false,
  isDeleteLoading: false,
};

const userSlice = createSlice({
  name: "create",
  initialState: initialState,
  reducers: {
    createUserStart: (state: IUserReducer) => {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    },
    createUserSuccess: (state: IUserReducer, action: PayloadAction<IUser>) => {
      return {
        ...state,
        isLoading: false,
        users: [...state.users, action.payload],
        error: null,
      };
    },
    createUserFailure: (state: IUserReducer, action: PayloadAction<string>) => {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    },
    createUserReset: (state: IUserReducer) => {
      return {
        ...state,
        isLoading: false,
        users: [],
        error: null,
      };
    },
    getUsersStart: (state: IUserReducer) => {
      return {
        ...state,
        isLoading: true,
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
        isLoading: false,
        users: data,
        error: null,
      };
    },
    getUsersFailure: (state: IUserReducer, action: PayloadAction<string>) => {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    },
    deleteUser: (state: IUserReducer, action: PayloadAction<string>) => {
      const userId = action.payload;
      const updatedUsers = state.users.filter((user) => user.id !== userId);
      return {
        ...state,
        isLoading: false,
        users: updatedUsers,
        error: null,
        isDeleteLoading: true,
      };
    },
    deleteUserSuccess: (state: IUserReducer) => {
      return {
        ...state,
        successMessage: "User deleted successfully",
        error: null,
        isDelete: true,
        isDeleteLoading: false,
      };
    },
    deleteUserFailure: (state: IUserReducer, action: PayloadAction<string>) => {
      return {
        ...state,
        error: action.payload,
        isDeleteLoading: false,
      };
    },
    userDeleteRest: (state) => {
      return {
        ...state,
        isdelete: false,
        currentUser: null,
        isDeleteLoading: false,
      };
    },
    editUserStart: (state: IUserReducer) => {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    },
    editUserSuccess: (state: IUserReducer, action: PayloadAction<IUser>) => {
      return {
        ...state,
        isLoading: false,
        currentUser: action.payload,
        error: null,
      };
    },
    editUserFailure: (state: IUserReducer, action: PayloadAction<string>) => {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    },
    updateUserStart: (state) => {
      return {
        ...state,
        error: null,
        successMessage: null,
        isUpdateLoading: true,
      };
    },
    updateUserSuccess: (state) => {
      return {
        ...state,
        isLoading: false,
        successMessage: "User updated successfully",
        error: null,
        isUpdated: true,
        isUpdateLoading: false,
      };
    },
    updateUserFailure: (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        successMessage: null,
        isUpdated: false,
        isUpdateLoading: false,
      };
    },
    userUpdateReset: (state) => {
      return {
        ...state,
        isUpdated: false,
        currentUser: null,
        isUpdateLoading: false,
      };
    },
  },
});

export default userSlice;

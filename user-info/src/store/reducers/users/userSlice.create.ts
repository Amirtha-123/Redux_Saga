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
      console.log("SUCCESS LIST", action);
      const { data } = action.payload;
      console.log(data);
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
  },
});

export default userSlice;

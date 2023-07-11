import { createAction } from "@reduxjs/toolkit";
import { IUser } from "../../../types/users/users.types";

export const USER_CREATE = "USER_CREATE";
export const createUserAction = createAction<IUser>(USER_CREATE);

export const USER_GETLIST = "USER_GETLIST";
export const getUserAction = createAction(USER_GETLIST);

export const createUserReset = createAction("CREATE_USER_RESET");

export const DELETE_USER = "DELETE_USER";
export const deleteUserAction = createAction(DELETE_USER);

export const EDIT_USER = "EDIT_USER";
export const editUserAction = createAction(EDIT_USER);

export const UPDATE_USER = "UPDATE_USER";
export const updateUserAction = (payload: IUser) => ({
  type: "UPDATE_USER",
  payload,
});

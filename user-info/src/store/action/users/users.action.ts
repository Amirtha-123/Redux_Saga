import { createAction } from "@reduxjs/toolkit";
import { IUser } from "../../../types/users/users.types";

export const USER_CREATE = "USER_CREATE";
export const createUserAction = createAction<IUser>(USER_CREATE);
export const USER_GETLIST = "USER_GETLIST";
export const getUserAction = createAction(USER_GETLIST);
export const createUserReset = createAction("CREATE_USER_RESET");

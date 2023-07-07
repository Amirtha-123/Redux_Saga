import { call, put, takeEvery } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import { IUser } from "../../../types/users/users.types";
import { apiRoutes } from "../../../utils/constants/apiUrl.constant";
import { apiCall } from "../../../utils/helpers/apiCall.helpers";
import userSlice from "../../reducers/users/userSlice.create";

import { PayloadAction } from "@reduxjs/toolkit";
import {
  DELETE_USER,
  USER_CREATE,
  USER_GETLIST,
  EDIT_USER,
} from "../../action/users/users.action";

const {
  createUserSuccess,
  createUserFailure,
  getUsersSuccess,
  getUsersFailure,
  deleteUserSuccess,
  deleteUserFailure,
  editUserSuccess,
  editUserFailure,
} = userSlice.actions;

function* createUserSaga(action: PayloadAction<IUser>) {
  try {
    const response: AxiosResponse<any> = yield apiCall({
      ...apiRoutes.createUser,
      data: action.payload,
    });
    if (response) {
      yield put(createUserSuccess(response.data.message));
    } else {
      yield put(createUserFailure("Failed to create user"));
    }
  } catch (error) {
    yield put(createUserFailure("error"));
  }
}

function* getUsersSaga() {
  try {
    const response: AxiosResponse<any> = yield apiCall({
      ...apiRoutes.getUser,
    });
    console.log(response, "response");

    if (response) {
      yield put(getUsersSuccess(response.data));
    } else {
      yield put(getUsersFailure("Failed to fetch users"));
    }
  } catch (error) {
    console.log("SAGA ERROR", error);
    yield put(getUsersFailure("error"));
  }
}

function* deleteUserSaga(action: PayloadAction<string>) {
  try {
    const userId: string = action.payload;

    const apiPathWithId: string = apiRoutes.deleteUser.apiPath.replace(
      ":id",
      userId
    );

    const response: AxiosResponse<any> = yield call(apiCall, {
      apiPath: apiPathWithId,
      method: "DELETE",
    });

    if (response) {
      yield put(deleteUserSuccess(response.data.message));
    } else {
      yield put(deleteUserFailure("Failed to delete user"));
    }
  } catch (error) {
    yield put(deleteUserFailure("error"));
  }
}

function* editUserSaga(action: PayloadAction<any>) {
  try {
    const userId: string = action.payload;

    const apiPathWithId: string = apiRoutes.editUser.apiPath.replace(
      ":id",
      userId
    );

    const response: AxiosResponse<any> = yield call(apiCall, {
      apiPath: apiPathWithId,
      method: "GET",
    });

    console.log(response, "response");

    if (response) {
      yield put(editUserSuccess(response.data.message));
    }
  } catch (error) {
    yield put(editUserFailure("error"));
  }
}

export function* watchCreateUser() {
  yield takeEvery(USER_CREATE, createUserSaga);
  yield takeEvery(USER_GETLIST, getUsersSaga);
  yield takeEvery(DELETE_USER, deleteUserSaga);
  yield takeEvery(EDIT_USER, editUserSaga);
}

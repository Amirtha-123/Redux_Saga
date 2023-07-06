import { call, put, takeEvery } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import { IUser } from "../../../types/users/users.types";
import { apiRoutes } from "../../../utils/constants/apiUrl.constant";
import { apiCall } from "../../../utils/helpers/apiCall.helpers";
import userSlice from "../../reducers/users/userSlice.create";

import { PayloadAction } from "@reduxjs/toolkit";
import { USER_CREATE, USER_GETLIST } from "../../action/users/users.action";

const {
  createUserSuccess,
  createUserFailure,
  getUsersSuccess,
  getUsersFailure,
} = userSlice.actions;

function* createUserSaga(action: PayloadAction<IUser>) {
  try {
    const response: AxiosResponse<any> = yield call(apiCall, {
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
    const response: AxiosResponse<any> = yield call(apiCall, {
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

export function* takeCreateUsersList() {
  yield takeEvery(USER_CREATE, createUserSaga);
  yield takeEvery(USER_GETLIST, getUsersSaga);
}

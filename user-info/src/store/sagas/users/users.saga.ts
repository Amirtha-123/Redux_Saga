import { call, put, takeEvery } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import { IUser } from "../../../types/users/users.types";
import { PayloadAction } from "@reduxjs/toolkit";

import { apiCall } from "../../../utils/helpers/apiCall.helpers";
import userSlice from "../../reducers/users/userSlice.create";
import { apiRoutes } from "../../../utils/constants/apiUrl.constant";
import {
  DELETE_USER,
  EDIT_USER,
  UPDATE_USER,
  USER_CREATE,
  USER_GETLIST,
} from "../../action/users/users.action";

const {
  createUserSuccess,
  createUserFailure,
  getUsersSuccess,
  getUsersFailure,
  deleteUserSuccess,
  deleteUserFailure,
  editUserStart,
  editUserSuccess,
  editUserFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
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

function* editUserSaga(action: PayloadAction<string>) {
  try {
    const userId: string = action.payload;
    yield put(editUserStart());

    const apiPathWithId: string = apiRoutes.editUser.apiPath.replace(
      ":id",
      userId
    );

    const response: AxiosResponse<any> = yield call(apiCall, {
      apiPath: apiPathWithId,
      method: "GET",
    });

    if (response && response.data) {
      yield put(editUserSuccess(response.data));
    } else {
      yield put(editUserFailure("Failed to edit user"));
    }
  } catch (error) {
    yield put(editUserFailure);
  }
}

function* updateUserSaga(action: PayloadAction<IUser>) {
  try {
    const { id, ...userData } = action.payload;
    yield put(updateUserStart());
    const apiPathWithId: string = apiRoutes.updateUser.apiPath.replace(
      ":id",
      String(id)
    );

    const response: AxiosResponse<any> = yield call(apiCall, {
      apiPath: apiPathWithId,
      method: "PUT",
      data: userData,
    });

    if (response) {
      yield put(updateUserSuccess(response.data.message));
    } else {
      yield put(updateUserFailure("Failed to update user"));
    }
  } catch (error) {
    yield put(updateUserFailure(error));
  }
}

export function* watchCreateUser() {
  yield takeEvery(USER_CREATE, createUserSaga);
  yield takeEvery(USER_GETLIST, getUsersSaga);
  yield takeEvery(DELETE_USER, deleteUserSaga);
  yield takeEvery(EDIT_USER, editUserSaga);
  yield takeEvery(UPDATE_USER, updateUserSaga);
}

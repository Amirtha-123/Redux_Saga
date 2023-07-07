import { watchCreateUser } from "./sagas/users/users.saga";
import { fork, all } from "redux-saga/effects";

export function* rootSaga() {
  yield all([fork(watchCreateUser)]);
}

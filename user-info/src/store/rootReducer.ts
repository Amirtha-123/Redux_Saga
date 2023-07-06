import { combineReducers } from "redux";
import userSlice from "./reducers/users/userSlice.create";

const rootReducer = combineReducers({
  user: userSlice.reducer,
});

export default rootReducer;

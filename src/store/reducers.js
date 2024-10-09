import { combineReducers } from "redux";

// import counterReducer from "./slices/counter/counterSlice";
// import toasterReducer from "./slices/toaster/toasterslice";
import authUserReducer from "./slices/authUser/authUserSlice";
// import checkRoleForPathSlice from "./slices/roleSlice/checkRoleForPathSlice";
// import notificationCountSlice from "./slices/notificationcount/notificationCountSlice";

export default combineReducers({
//   counterReducer,
//   toasterReducer,
  authUserReducer,
//   checkRoleForPathSlice,
//   notificationCountSlice
});

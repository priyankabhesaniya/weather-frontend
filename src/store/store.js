import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import reducers from "./reducers";


const persistConfig = {
  key: "root",
  storage,
  // blacklist: [],
  // whitelist: ["authUserReducer"],
};

const rootReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: {
    projectpulse: rootReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
//   devTools: process.env.NODE_ENV === "production" ? false : true,
});

export default store;

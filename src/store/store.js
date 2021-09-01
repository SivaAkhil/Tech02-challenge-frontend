import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
// import restApi from "./api/restApi";
// import { setupListeners } from "@reduxjs/toolkit/query";

const store = configureStore({
  reducer: {
    auth: authReducer,
    // [restApi.reducerPath]: restApi.reducer,
  },

  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(restApi.middleware),
});

// setupListeners(store.dispatch);

export default store;

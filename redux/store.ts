
import {
  configureStore,
  ThunkAction,
  Action,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";

import ReduxLogger from "redux-logger";
import SearchSliceReducer from '../redux/slices/searchSlice'
import KeywordSliceReducer from '../redux/slices/keywordSlice'
import UserCountSlice from "./slices/userCountSlice";

const middleware = (getDefaultMiddleware: any) =>
  getDefaultMiddleware().concat(ReduxLogger);

export const store = configureStore({
  // middleware,
  reducer: {
    users: SearchSliceReducer,
    userCount: UserCountSlice,
    keyword: KeywordSliceReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
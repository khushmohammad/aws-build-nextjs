import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import settingReducer from "./setting/reducers";
import profileReducer from "./profile";
import postReducer from "./post";
import allFeedsReducer from "./post/allFeeds";
import groupReducer from "./groups";
import friendReducer from "./friends";
import friendsRequests from "./friends/friendsRequests";
import nonFriendsLIst from "./friends/nonFriendsList";
import LoaderReducer from "./site/Loader";
import { persistStore } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  stateReconciler: autoMergeLevel2,
};

const reducers = combineReducers({
  setting: settingReducer,
  user: profileReducer,
  post: postReducer,
  allFeed: allFeedsReducer,
  groups: groupReducer,
  friends: friendReducer,
  friendsRequests: friendsRequests,
  nonFriendsLIst: nonFriendsLIst,
  loader: LoaderReducer
});

const rootReducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    if (state.setting.setting)
      nextState.setting.setting = state.setting.setting;
    if (state.user.user) nextState.user.user = state.user.user;
    if (state.post.post) nextState.post.post = state.post.post;
    return nextState;
  } else {
    return reducers(state, action);
  }
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = configureStore({
//   reducer: persistedReducer,
// });

// export { store, persistor };

// const initStore = () => {
//   return configureStore({reducer: rootReducer, middleware: [thunk, ])});
// };

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

let persistor = persistStore(store);

export { persistor };
export const wrapper = createWrapper(() => store);

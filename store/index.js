import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import settingReducer from "./setting/reducers";
import profileReducer from "./profile";
import postReducer from "./post";
import allFeedsReducer from "./post/allFeeds";
import groupReducer from "./groups";
import friendReducer from "./friends";
import eventReducer from "./events";
import modeReducer from "./mode/mode";
import friendsRequests from "./friends/friendsRequests";
import nonFriendsLIst from "./friends/nonFriendsList";
import loaderReducer from "./site/Loader";
import helpReducer from "./site/help";
import resourceReducer from "./site/resource";
import activityReducer from "./site/activity";
import notificationReducer from "./site/Notification";
import { persistStore } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import systemResource from "./system-resource";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  stateReconciler: autoMergeLevel2,
};

const reducers = combineReducers({
  setting: settingReducer,
  mode: modeReducer,
  user: profileReducer,
  post: postReducer,
  allFeed: allFeedsReducer,
  groups: groupReducer,
  events: eventReducer,
  friends: friendReducer,
  friendsRequests: friendsRequests,
  nonFriendsLIst: nonFriendsLIst,
  loader: loaderReducer,
  notification: notificationReducer,
  help: helpReducer,
  resource: resourceReducer,
  activity: activityReducer,
  systemResource: systemResource,
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

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import courseReducer from './courseSlice';
import userReducer from './userSlice'; 
import tutorreducer from './tutorSlice'
import OrderDataSlice from './OrderDataSlice';
import adminSlice from './adminSlice';
// Configuration for redux-persist
const persistConfig = {
  key: 'root',
  storage,
  // By not specifying whitelist or blacklist, everything will be persisted
};

// Combine your reducers
const rootReducer = combineReducers({
  user: userReducer,
  tutor:tutorreducer,
  course: courseReducer,
  order: OrderDataSlice,
  admin:adminSlice,
  // Add other reducers here if you have more slices
});

// Wrap the rootReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the Redux store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Create a persistor for handling persistence
export const persistor = persistStore(store);
export default store;

// Export types for use with React-Redux hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
















// import { configureStore } from '@reduxjs/toolkit';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import courseReducer from './courseSlice';
// import userReducer from  './userSlice';


// // Configuration for redux-persist
// const persistConfig = {
//   key: 'root', // You can use 'course' if you want to isolate course state
//   storage,
// };

// // Wrap the courseReducer with persistReducer
// const persistedReducer = persistReducer(persistConfig, courseReducer);

// // Configure the Redux store
// const store = configureStore({
//   reducer: {
//     course: persistedReducer,

//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
// });

// // Create a persistor for handling persistence
// export const persistor = persistStore(store);
// export default store;

// // Export types for use with React-Redux hooks
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

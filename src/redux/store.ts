import { configureStore, Action, ThunkAction } from '@reduxjs/toolkit';
import rootReducer from './reducers';

// Set up Redux store to manage state changes
export const store = configureStore({
  reducer: rootReducer
});

// Infer the root state type from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Export a hook that resolves dispatch types
export type AppDispatch = typeof store.dispatch;

// Export type definition for a thunk action
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

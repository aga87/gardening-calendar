import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '@/features/auth/redux/authSlice';
import plantsReducer from '@/features/plants/redux/plantsSlice';

export default combineReducers({
  authReducer,
  plantsReducer
});

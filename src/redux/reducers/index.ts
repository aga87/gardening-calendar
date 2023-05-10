import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '@/features/auth/redux/authSlice';
import plantsReducer from '@/features/plants/redux/plants/plantsSlice';
import redirectReducer from '@/features/plants/redux/redirect/redirectSlice';

export default combineReducers({
  authReducer,
  plantsReducer,
  redirectReducer
});

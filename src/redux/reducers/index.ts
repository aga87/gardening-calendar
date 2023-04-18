import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '@/features/auth/redux/authSlice';

export default combineReducers({
  authReducer
});

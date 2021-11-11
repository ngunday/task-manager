import { configureStore } from '@reduxjs/toolkit';
import applicationsReducer from './slices/applications';
import pulseReducer from './slices/pulse';

const store = configureStore({
  reducer: {
    applications: applicationsReducer,
    pulse: pulseReducer,
  },
});

//@ts-ignore
window.store = store;
export default store;

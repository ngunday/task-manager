import { configureStore } from '@reduxjs/toolkit';
import applicationsReducer from './slices/applications';
import pulseReducer from './slices/pulse';
import sortingReducer from './slices/sorting';

const store = configureStore({
  reducer: {
    applications: applicationsReducer,
    pulse: pulseReducer,
    sorting: sortingReducer,
  },
});

//@ts-ignore
window.store = store;
export default store;

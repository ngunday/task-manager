import { configureStore } from '@reduxjs/toolkit';
import applicationsReducer from './slices/applications';
import pulseReducer from './slices/pulse';
import sortingReducer from './slices/sorting';
import modalReducer from './slices/modal';

const store = configureStore({
  reducer: {
    applications: applicationsReducer,
    pulse: pulseReducer,
    sorting: sortingReducer,
    modal: modalReducer,
  },
});

//@ts-ignore
window.store = store;
export default store;

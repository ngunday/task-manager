import { configureStore } from '@reduxjs/toolkit';
import applicationsReducer from './slices/applications';

/**
 * Redux store for Home application.
 */
const store = configureStore({
    reducer: {
        applications: applicationsReducer
    }
});

//@ts-ignore
window.store = store;

export default store;
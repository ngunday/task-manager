import { createSlice } from '@reduxjs/toolkit';
import { Application } from '../../model/Shapes';

export interface ApplicationsRootState {
  applications: { value: Application[] };
}

export interface ApplicationsAction {
  payload: Application[];
  type: string;
}

export const applicationsSlice = createSlice({
  name: 'applications',
  initialState: {
    value: [],
  },
  reducers: {
    setApplications: (state: ApplicationsRootState['applications'], action: ApplicationsAction) => {
      state.value = action.payload ? [...action.payload] : [];
    },
  },
});

export const { setApplications } = applicationsSlice.actions;

export const selectApplications = (state: ApplicationsRootState): Application[] => state.applications.value;

export default applicationsSlice.reducer;

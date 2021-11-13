import { createSlice } from '@reduxjs/toolkit';
import { SortField, SortMode, SortOrder } from '../../model/UI';

export interface SortingRootState {
  sorting: { value: SortMode };
}

export interface SortingAction {
  payload: SortField;
  type: string;
}

export const sortingSlice = createSlice({
  name: 'sorting',
  initialState: {
    value: {
      field: SortField.NAME,
      order: SortOrder.ASCENDING,
    },
  },
  reducers: {
    setSortMode: (state: SortingRootState['sorting'], action: SortingAction) => {
      const field =
        state.value.field === action.payload && state.value.order === SortOrder.ASCENDING
          ? SortField.NAME
          : action.payload;
      const order =
        state.value.field === action.payload && state.value.order === SortOrder.DESCENDING
          ? SortOrder.ASCENDING
          : SortOrder.DESCENDING;
      state.value = action.payload
        ? { field, order }
        : {
            field: SortField.NAME,
            order: SortOrder.ASCENDING,
          };
    },
  },
});

export const { setSortMode } = sortingSlice.actions;

export const selectSortMode = (state: SortingRootState): SortMode => state.sorting.value;

export default sortingSlice.reducer;

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
      field: SortField.Name,
      order: SortOrder.Ascending,
    },
  },
  reducers: {
    setSortMode: (state: SortingRootState['sorting'], action: SortingAction) => {
      const field =
        state.value.field === action.payload && state.value.order === SortOrder.Ascending
          ? SortField.Name
          : action.payload;
      const order =
        state.value.field === action.payload && state.value.order === SortOrder.Descending
          ? SortOrder.Ascending
          : SortOrder.Descending;
      state.value = action.payload
        ? { field, order }
        : {
            field: SortField.Name,
            order: SortOrder.Ascending,
          };
    },
  },
});

export const { setSortMode } = sortingSlice.actions;

export const selectSortMode = (state: SortingRootState): SortMode => state.sorting.value;

export default sortingSlice.reducer;

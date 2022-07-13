import { createSlice } from '@reduxjs/toolkit';
import { Modal } from '../../model/UI';

export interface ModalRootState {
    modal: { value?: Modal };
}

export interface ModalAction {
    payload: Modal;
    type: string;
}

export const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        value: undefined,
    },
    reducers: {
        showModal: (state: ModalRootState['modal'], action: ModalAction) => {
            state.value = action.payload;
        },
        dismissModal: (state: ModalRootState['modal']) => {
            state.value = undefined;
        },
    },
});

export const { showModal, dismissModal } = modalSlice.actions;

export const selectModal = (state: ModalRootState): Modal | undefined => state.modal.value;

export default modalSlice.reducer;

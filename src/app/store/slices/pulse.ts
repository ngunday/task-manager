import { createSlice } from '@reduxjs/toolkit';
import { PULSE_HISTORY_LENGTH } from '../../constants';
import { Pulse } from '../../model/Shapes';

export interface PulseRootState {
  pulse: { value: Record<string, number[]> };
}

export interface PulseActionPayload {
  uuid: string;
  cpuUsage: number;
}

export interface PulseAction {
  payload: Pulse;
  type: string;
}

export const pulseSlice = createSlice({
  name: 'pulse',
  initialState: {
    value: {},
  },
  reducers: {
    submitPulse: (state: PulseRootState['pulse'], action: PulseAction) => {
      state.value = Object.fromEntries(
        Object.keys(action.payload).map((uuid) => {
          const appPulses: number[] = state.value[uuid];
          return [
            uuid,
            appPulses
              ? [...appPulses.slice(Math.max(appPulses.length - PULSE_HISTORY_LENGTH, 0)), action.payload[uuid]]
              : [action.payload[uuid]],
          ];
        })
      );
    },
  },
});

export const { submitPulse } = pulseSlice.actions;

export const selectAppPulse =
  (uuid: string) =>
  (state: PulseRootState): number[] =>
    state.pulse.value[uuid];

export default pulseSlice.reducer;

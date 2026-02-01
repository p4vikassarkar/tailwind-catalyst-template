import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ExampleState {
  value: number;
}

const initialState: ExampleState = {
  value: 0,
};

const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {
    increment(state) {
      state.value += 1;
    },
    decrement(state) {
      state.value -= 1;
    },
    incrementAsync(state, action: PayloadAction<number>) {
      // This action will be handled by the saga
      console.log(state);
      console.log(action);
    },
  },
});

export const { increment, decrement, incrementAsync } = exampleSlice.actions;
export default exampleSlice.reducer;

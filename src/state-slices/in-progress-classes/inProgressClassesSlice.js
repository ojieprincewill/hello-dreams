import { createSlice } from '@reduxjs/toolkit';

const IN_PROGRESS_KEY = 'inProgressClasses';

const getInitialState = () => {
  try {
    const saved = localStorage.getItem(IN_PROGRESS_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const inProgressClassesSlice = createSlice({
  name: 'inProgressClasses',
  initialState: getInitialState(),
  reducers: {
    addInProgress: (state, action) => {
      const id = action.payload;
      if (!state.includes(id)) {
        state.push(id);
        localStorage.setItem(IN_PROGRESS_KEY, JSON.stringify(state));
      }
    },
    removeInProgress: (state, action) => {
      const id = action.payload;
      const idx = state.indexOf(id);
      if (idx !== -1) {
        state.splice(idx, 1);
        localStorage.setItem(IN_PROGRESS_KEY, JSON.stringify(state));
      }
    },
    setInProgress: (state, action) => action.payload,
  },
});

export const { addInProgress, removeInProgress, setInProgress } = inProgressClassesSlice.actions;
export default inProgressClassesSlice.reducer; 
import { createSlice } from '@reduxjs/toolkit';

const COMPLETED_KEY = 'completedClasses';

const getInitialState = () => {
  try {
    const saved = localStorage.getItem(COMPLETED_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const completedClassesSlice = createSlice({
  name: 'completedClasses',
  initialState: getInitialState(),
  reducers: {
    addCompleted: (state, action) => {
      const id = action.payload;
      if (!state.includes(id)) {
        state.push(id);
        localStorage.setItem(COMPLETED_KEY, JSON.stringify(state));
      }
    },
    removeCompleted: (state, action) => {
      const id = action.payload;
      const idx = state.indexOf(id);
      if (idx !== -1) {
        state.splice(idx, 1);
        localStorage.setItem(COMPLETED_KEY, JSON.stringify(state));
      }
    },
    setCompleted: (state, action) => action.payload,
  },
});

export const { addCompleted, removeCompleted, setCompleted } = completedClassesSlice.actions;
export default completedClassesSlice.reducer; 
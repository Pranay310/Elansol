import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userNameRegex: /^[A-Za-z\s]*$/,
  phoneRegex: /^[0-9]{10}$/, 
  emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  passwordRegex: /^(?=.*[A-Z])(?=.*[a-zA-Z]{5,})(?=.*[!@#$%^&*]).+$/,
  phoneValid: true,  
};

const slice = createSlice({
  name: 'validation',
  initialState,
  reducers: {
    validatePhone: (state, action) => {
      const isValid = state.phoneRegex.test(action.payload);
      state.phoneValid = isValid;  
    },
  },
});

export const { validatePhone } = slice.actions;
export const selectValidations = (state) => state.validation;
export default slice.reducer;

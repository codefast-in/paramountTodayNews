import {createSlice} from "@reduxjs/toolkit";
import {safeLocalStorage} from "./Wrapper";

// const initialState = {
//   token: safeLocalStorage.getItem("token")
//     ? JSON.stringify(safeLocalStorage.getItem("token"))
//     : null,
//   user: safeLocalStorage.getItem("user")
//     ? JSON.stringify(safeLocalStorage.getItem("user"))
//     : null,
// };
const initialState = {
    token:null,
    user:null
}

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setUser(state, actions) {
      state.user = actions.payload;
      safeLocalStorage.setItem("user", JSON.stringify(actions.payload));
    },

    setToken(state, actions) {
      state.token = actions.payload;
      safeLocalStorage.setItem("token", JSON.stringify(actions.payload));
    },
  },
});

export const {setUser, setToken} = authSlice.actions;

export default authSlice.reducer;

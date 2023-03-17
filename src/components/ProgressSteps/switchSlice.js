import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    header: true,
    footer: true,
    drawerOverlay: true,
    leftDrawer:true,
    rightDrawer: true,
    navTab:true,
    bottomMenu:true,
    logo:'left',
    preset:'blue'
};


const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: { 
    toggleSwitch: (state, action) => {
        let data = action.payload;
        state = data
        return state
    }
  },
});
export const { toggleSwitch } = userSlice.actions;
export default userSlice.reducer;

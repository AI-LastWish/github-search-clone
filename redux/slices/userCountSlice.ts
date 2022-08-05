import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  userCount: 0
}

const UserCountSlice = createSlice({
  name: 'userCount',
  initialState,
  reducers: {
    setUserCount(state, action) {
      state.userCount = action.payload
    }
  }
})

export const { setUserCount } = UserCountSlice.actions
export default UserCountSlice.reducer
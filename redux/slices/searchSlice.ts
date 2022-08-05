import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  users: []
}

const SearchSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action) {
      state.users = action.payload
    }
  }
})

export const { setUsers } = SearchSlice.actions
export default SearchSlice.reducer
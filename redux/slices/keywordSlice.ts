import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  keyword: ''
}

const KeywordSlice = createSlice({
  name: 'keyword',
  initialState,
  reducers: {
    setKeyword(state, action) {
      state.keyword = action.payload
    }
  }
})

export const { setKeyword } = KeywordSlice.actions
export default KeywordSlice.reducer
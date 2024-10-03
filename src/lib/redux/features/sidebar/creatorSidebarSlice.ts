import { RootState } from '@/lib/redux/store'
import { createSlice } from '@reduxjs/toolkit'

// Define a type for the slice state
type CreatorSidebarState = {
  isCollapsed: boolean
}

// Define the initial state using that type
const initialState: CreatorSidebarState = {
  isCollapsed: false,
}

export const creatorSidebarSlice = createSlice({
  name: 'creatorSidebar',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    onCollapse: (state) => {
      state.isCollapsed = true
    },
    onExpand: (state) => {
      state.isCollapsed = false
    },
  },
})

export const { onCollapse, onExpand } = creatorSidebarSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const isCollapsed = (state: RootState) => state.creatorSidebar.isCollapsed

export default creatorSidebarSlice.reducer

import { RootState } from '@/lib/redux/store'
import { createSlice } from '@reduxjs/toolkit'

// Define a type for the slice state
type SidebarState = {
  isCollapsed: boolean
}

// Define the initial state using that type
const initialState: SidebarState = {
  isCollapsed: false,
}

export const sidebarSlice = createSlice({
  name: 'sidebar',
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

export const { onCollapse, onExpand } = sidebarSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const isCollapsed = (state: RootState) => state.sidebar.isCollapsed

export default sidebarSlice.reducer

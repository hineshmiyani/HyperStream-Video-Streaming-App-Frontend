import creatorSidebarReducer from '@/lib/redux/features/sidebar/creatorSidebarSlice'
import sidebarReducer from '@/lib/redux/features/sidebar/sidebarSlice'
import { configureStore } from '@reduxjs/toolkit'

export const makeStore = () => {
  return configureStore({
    reducer: {
      sidebar: sidebarReducer,
      creatorSidebar: creatorSidebarReducer,
    },
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

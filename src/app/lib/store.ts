import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../feature/auth/authSlice'
import counterReducer from '../feature/counter/counterSlice'
export const store = configureStore({
	reducer: {
		auth: authReducer,
		counter: counterReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

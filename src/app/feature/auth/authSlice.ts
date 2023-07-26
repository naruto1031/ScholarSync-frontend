import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const loginUser = createAsyncThunk('auth/loginUser', async (userInformation, { rejectWithValue }) => {
		try {
			const response = await axios.post('http://127.0.0.1:8000/api/login', userInformation)
			return response.data
		} catch (error) {
			return rejectWithValue(error)
		}
	},
)

interface Auth {
	user: null | object
	status: 'idle' | 'loading' | 'succeeded' | 'failed'
	error: null | string
}

const initialState: Auth = {
	user: null,
	status: 'idle',
	error: null,
}

const authSlice = createSlice({
	name: 'auth',
	initialState: initialState,
	reducers: {
		logout: (state) => {
			state.user = null
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loginUser.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.user = action.payload
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message || 'Something went wrong'
			})
	},
})

export const { logout } = authSlice.actions
export default authSlice.reducer

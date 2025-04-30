import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
    email: string
}

const initialState: UserState = {
    email: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginUser: (state, action: PayloadAction<string>) => {
            state.email = action.payload
        },
        logoutUser: state => {
            state.email = ''
        }
    }
})

export const { loginUser, logoutUser } = userSlice.actions

export default userSlice.reducer
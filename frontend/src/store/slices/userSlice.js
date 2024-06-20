import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getMyInfo } from '../../services/userService';

// Giả sử đây là API của bạn để lấy thông tin người dùng
export const fetchUser = createAsyncThunk(
    'user/fetchUser',
    async () => {
        try {
            const response = await getMyInfo();
            const data = response.data;
            // console.log('chec data:', data);
            return data;
        } catch (error) {
            console.log(error);
        }
    }
);


const userSlice = createSlice({
    name: 'user',
    initialState: {
        userInfo: null,
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.userInfo = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default userSlice.reducer;
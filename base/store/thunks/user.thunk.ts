import { userApis } from '@/base/apis/user.api';
import { UserModel } from '@/base/models/user.model';
import { createAsyncThunk } from '@reduxjs/toolkit';


export const getUserSessionThunk = createAsyncThunk<UserModel, string>(
  'auth/getSessionThunk',
  async (userId: string, thunkAPI) => {
    try {
      const res = await userApis.getById(userId);
      return res
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
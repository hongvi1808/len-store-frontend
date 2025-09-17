import { cartApis } from '@/base/apis/cart.api';
import { UserModel } from '@/base/models/user.model';
import { createAsyncThunk } from '@reduxjs/toolkit';


export const getCountCartThunk = createAsyncThunk(
  'cartUser/getCountCartThunk',
  async (_, thunkAPI) => {
    try {
      const res = await cartApis.getCountByCustomer();
      return res
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
export const getListCartThunk = createAsyncThunk<any, any>(
  'cartUser/getListCartThunk',
  async (data: any, thunkAPI) => {
    try {
      const res = await cartApis.getListByCustomer(data);
      return res
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
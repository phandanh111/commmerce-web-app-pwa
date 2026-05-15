import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { wishlistApi } from '@/api/wishlist.api';

export interface WishlistItem {
  id: number;
  item: {
    id: number;
    name: string;
    price: number;
    image?: string;
  };
}

interface WishlistState {
  items: WishlistItem[];
  loading: boolean;
}

const initialState: WishlistState = { items: [], loading: false };

export const fetchWishlist = createAsyncThunk('wishlist/fetch', async (_, { rejectWithValue }) => {
  try {
    const res = await wishlistApi.getMyList();
    // Response: { data: { total, data: WishlistEntity[] } }
    return res.data?.data?.data || [];
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message);
  }
});

export const addToWishlist = createAsyncThunk('wishlist/add', async (itemId: number, { dispatch, rejectWithValue }) => {
  try {
    await wishlistApi.add(itemId);
    dispatch(fetchWishlist());
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message);
  }
});

export const removeFromWishlist = createAsyncThunk('wishlist/remove', async (wishlistId: number, { dispatch, rejectWithValue }) => {
  try {
    await wishlistApi.remove(wishlistId);
    dispatch(fetchWishlist());
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message);
  }
});

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => { state.loading = true; })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchWishlist.rejected, (state) => { state.loading = false; });
  },
});

export default wishlistSlice.reducer;

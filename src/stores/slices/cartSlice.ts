import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { cartApi } from '@/api/cart.api';

export interface CartItem {
  id: number;
  quantity: number;
  item: {
    id: number;
    name: string;
    price: number;
    image?: string;
    stock: number;
  };
}

interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
}

const initialState: CartState = { items: [], loading: false, error: null };

export const fetchCart = createAsyncThunk('cart/fetch', async (_, { rejectWithValue }) => {
  try {
    const res = await cartApi.getAll();
    // Response: { data: { total, data: CartEntity[] } }
    return res.data?.data?.data || [];
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message);
  }
});

export const addToCart = createAsyncThunk('cart/add', async (data: { itemId: number; quantity: number }, { dispatch, rejectWithValue }) => {
  try {
    await cartApi.addItem(data);
    dispatch(fetchCart());
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || 'Không thể thêm vào giỏ hàng');
  }
});

export const updateCartItem = createAsyncThunk('cart/update', async ({ cartId, quantity }: { cartId: number; quantity: number }, { dispatch, rejectWithValue }) => {
  try {
    await cartApi.updateItem(cartId, { quantity });
    dispatch(fetchCart());
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message);
  }
});

export const removeCartItem = createAsyncThunk('cart/remove', async (cartId: number, { dispatch, rejectWithValue }) => {
  try {
    await cartApi.removeItem(cartId);
    dispatch(fetchCart());
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message);
  }
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart(state) { state.items = []; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => { state.loading = true; })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state) => { state.loading = false; });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:3000/expenses";


export const addExpense = createAsyncThunk("expense/addExpense", async (expense, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("user");
        const res = await axios.post(API, expense, {
            headers: {
                "Authorization": token
            }
        });
        console.log(res.data);
        return res.data.expense;

    } catch (err) {
        return rejectWithValue(err);
    }

})


export const fetchAllExpenses = createAsyncThunk(
    "expense/fetchAllExpenses",
    async ({ page, limit }, { rejectWithValue }) => {
      try {
        const token = localStorage.getItem("user");
  
        const res = await axios.get(
          `${API}?page=${page}&limit=${limit}`,
          {
            headers: { Authorization: token },
          }
        );
  
        return res.data;
      } catch (err) {
        return rejectWithValue(err.response?.data);
      }
    }
  );

export const deleteExpense = createAsyncThunk("expense/deleteExpense", async (id, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("user");
        const res = await axios.delete(`${API}/${id}`, {
            headers: {
                "Authorization": token
            }
        })
        return id;
    }
    catch (Err) {
        return rejectWithValue(Err);
    }

})

const expenseSlice = createSlice({
    name: "expense",
    initialState: {
        list: [],
        currentPage: 1,
        isNextPage: false,
        isPreviousPage: false,
        nextPage: null,
        previousPage: null,
        lastPage: 1,
        error: null,
        loading: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addExpense.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addExpense.fulfilled, (state, action) => {
                state.loading = false;
                state.list.push(action.payload);
            })
            .addCase(addExpense.rejected, (state) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchAllExpenses.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllExpenses.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload.expenses;
                state.currentPage = action.payload.currentPage;
                state.isNextPage = action.payload.isNextPage;
                state.isPreviousPage = action.payload.isPreviousPage;
                state.nextPage = action.payload.nextPage;
                state.previousPage = action.payload.previousPage;
                state.lastPage = action.payload.lastPage;
            })
            .addCase(fetchAllExpenses.rejected, (state) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteExpense.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteExpense.fulfilled, (state, action) => {
                const id = action.payload;
                state.loading = false;
                state.list = state.list.filter(ele => ele.id !== id);
            })
            .addCase(deleteExpense.rejected, (state) => {
                state.loading = false;
                state.error = action.payload;
            })

    }
});


export const expenseActions = expenseSlice.actions;
export default expenseSlice.reducer;
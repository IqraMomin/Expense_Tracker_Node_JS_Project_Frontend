import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:3000/expenses";

export const addExpense = createAsyncThunk("expense/addExpense", async (expense, { rejectWithValue }) => {
    try {
        const res = await axios.post(API, expense);
        console.log(res.data);
        return res.data.expense;

    } catch (err) {
        return rejectWithValue(err);
    }

})

export const fetchAllExpenses = createAsyncThunk("expense/fetchAllExpenses",async()=>{
    try{
        
        const res = await axios.get(API);        
        return res.data;

    }catch(err){
        console.log(err);
    }
})

const expenseSlice = createSlice({
    name: "expense",
    initialState: {
        list: [],
        error: null,
        loading: false
    },
    reducers: {},
    extraReducers: (builder) => { 
        builder
        .addCase(addExpense.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(addExpense.fulfilled,(state,action)=>{
            state.loading = false;
            state.list.push(action.payload);
        })
        .addCase(addExpense.rejected,(state)=>{
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(fetchAllExpenses.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchAllExpenses.fulfilled,(state,action)=>{
            state.loading = false;
            state.list = action.payload;
        })
        .addCase(fetchAllExpenses.rejected,(state)=>{
            state.loading = false;
            state.error = action.payload;
        })

    }
});


export const expenseActions = expenseSlice.actions;
export default expenseSlice.reducer;
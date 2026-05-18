import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";



const API = "http://3.6.41.27:3000";


export const addExpense = createAsyncThunk(
    "expense/addExpense",
    async (expense, { rejectWithValue, dispatch, getState }) => {
      try {
        const token = Cookies.get("user");
  
        await axios.post(`${API}/expenses`, expense, {
          headers: { Authorization: token }
        });
  
        const state = getState();
        const currentPage = state.expense.currentPage;
        const type = state.expense.type; 
        const limit = Number(Cookies.get("itemsPerPage"));
  
        if (type === "all") {
          dispatch(fetchAllExpenses({ page: currentPage, limit }));
        } else {
          dispatch(fetchExpense({ type, page: currentPage, limit }));
        }
  
      } catch (err) {
        return rejectWithValue(err);
      }
    }
  );


export const fetchAllExpenses = createAsyncThunk(
    "expense/fetchAllExpenses",
    async ({ page, limit }, {dispatch }) => {
        try {
            dispatch(setLoading(true));
            const token = Cookies.get("user");

            const res = await axios.get(
                `${API}/expenses?page=${page}&limit=${limit}`,
                {
                    headers: { Authorization: token },
                }
            );
            Cookies.set("currentPage", res.data.currentPage);
            dispatch(setExpense({
                expenses: res.data.expenses,
                currentPage: res.data.currentPage,
                isNextPage: res.data.isNextPage,
                isPreviousPage: res.data.isPreviousPage,
                nextPage: res.data.nextPage,
                previousPage: res.data.previousPage,
                lastPage: res.data.lastPage,
                type:"all"
            }))
            dispatch(setLoading(false));

        } catch (err) {
            dispatch(setError(err.message));
            dispatch(setLoading(false));
        }
    }
);

export const deleteExpense = createAsyncThunk("expense/deleteExpense", async (id, { rejectWithValue,
    dispatch, getState }) => {
    try {
        const state = getState();
        const currentPage = state.expense.currentPage;
        const token = Cookies.get("user");
        await axios.delete(`${API}/expenses/${id}`, {
            headers: {
                "Authorization": token
            }
        })
        const limit = Number(Cookies.get("itemsPerPage"));
        dispatch(fetchAllExpenses({ page: currentPage, limit }))

        return id;
    }
    catch (Err) {
        return rejectWithValue(Err);
    }

})

export const fetchExpense= createAsyncThunk("expense/fetchExpense",async({type,page,limit,date},{dispatch})=>{
    try {
        dispatch(setLoading(true));
        const token = Cookies.get("user");
       
        const res = await axios.get(
            `${API}/premium?page=${page}&limit=${limit}&type=${type}&date=${date}`,
            {
                headers: { Authorization: token },
            }
        );
        Cookies.get("currentPage", res.data.currentPage);
        console.log("Expense",res.data.expenses);
        dispatch(setExpense({
            expenses: res.data.expenses,
            currentPage: res.data.currentPage,
            isNextPage: res.data.isNextPage,
            isPreviousPage: res.data.isPreviousPage,
            nextPage: res.data.nextPage,
            previousPage: res.data.previousPage,
            lastPage: res.data.lastPage,
            type:type
        }))
        dispatch(setLoading(false));

    } catch (err) {
        dispatch(setError(err.message));
        dispatch(setLoading(false));
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
        loading: false,
        itemsPerPage: Number(Cookies.get("itemsPerPage")) || 2,
        type:"all"
    },
    reducers: {
        setExpense: (state, action) => {
            state.list = action.payload.expenses;
            state.currentPage = action.payload.currentPage;
            state.isNextPage = action.payload.isNextPage;
            state.isPreviousPage = action.payload.isPreviousPage;
            state.nextPage = action.payload.nextPage;
            state.previousPage = action.payload.previousPage;
            state.lastPage = action.payload.lastPage;
            state.type = action.payload.type;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        clearExpenses:(state)=>{
            state.list = [];
            state.currentPage = 1;
            state.isNextPage = false;
            state.isPreviousPage = false;
            state.nextPage = null;
            state.previousPage = null;
            state.lastPage = 1;
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(addExpense.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addExpense.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(addExpense.rejected, (state) => {
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


export const {setExpense,setError,setLoading,clearExpenses} = expenseSlice.actions;
export default expenseSlice.reducer;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:3000/users"

export const signUp = createAsyncThunk("auth/signup",async (user,{rejectWithValue})=>{
    try{
        const res = await axios.post(`${API}/signup`,user);
        return res.data;
       
    }
    catch(err){
        return rejectWithValue(err.response?.data?.message||"Sign Up failed");
    }
    

})

export const loginUser = createAsyncThunk("auth/loginUser",async (user,{rejectWithValue})=>{
    try{
        const res = await axios.post(`${API}/login`,user);
        localStorage.setItem("user",res.data.user.email);
        return res.data;

    }catch(err){
        return rejectWithValue(err.response?.data?.message||"Login Failed");
    }

})

const storedUser = localStorage.getItem("user")||null;

const authSlice = createSlice({
    name:"auth",
    initialState:{
        user:storedUser,
        isLoggedIn:!!storedUser,
        error:null,
        loading:null,
        successMessage:null
    },
    reducers:{
        clearError:(state)=>{
            state.error = null;
        },
        clearSuccessMessage:(state)=>{
            state.successMessage = null
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.successMessage =null
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user.email;
            state.isLoggedIn = true;
            state.successMessage = "Login Successful"
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(signUp.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.successMessage = null
        })
        .addCase(signUp.fulfilled, (state) => {
            state.loading = false;
            state.successMessage = "Registration Successful"
        })
        .addCase(signUp.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;

        });
    }

});
export const authActions = authSlice.actions;
export default authSlice.reducer;
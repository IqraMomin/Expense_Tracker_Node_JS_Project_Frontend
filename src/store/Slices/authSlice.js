import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchAllExpenses } from "./expenseSlice";
import Cookies from "js-cookie";

const API = "http://3.6.41.27:3000"

export const signUp = createAsyncThunk("auth/signup",async (user,{rejectWithValue})=>{
    try{
        const res = await axios.post(`${API}/users/signup`,user);
        return res.data;
       
    }
    catch(err){
        return rejectWithValue(err.response?.data?.message||"Sign Up failed");
    }
    

})

export const loginUser = createAsyncThunk("auth/loginUser",async (user,{rejectWithValue,dispatch})=>{
    try{
        const res = await axios.post(`${API}/users/login`,user);
        Cookies.set("user",res.data.token);
        Cookies.set("isPremium",res.data.isPremium.toString());
        dispatch(fetchAllExpenses());       
        return res.data;

    }catch(err){
        return rejectWithValue(err.response?.data?.message||"Login Failed");
    }

})
export const getLeaderBoard = createAsyncThunk("auth/getLeaderBoard",
async()=>{
    const res= await axios.get(`${API}/users/premium/showLeaderBoard`);
    return res.data;
})

export const resetPassword = createAsyncThunk("auth/resetPassword",async({email},rejectWithValue)=>{
    try{
        const res= await axios.post(`${API}/password/forgotpassword`,{email});
        console.log(res.data.message);
        return res.data;

    }catch(err){
        return rejectWithValue(err);
    }
})

const storedUser = Cookies.get("user")||null;

const authSlice = createSlice({
    name:"auth",
    initialState:{
        user:storedUser,
        isLoggedIn:!!storedUser,
        error:null,
        loading:null,
        successMessage:null,
        isPremium:Cookies.get("isPremium") === "true",
        leaderBoard:[]
    },
    reducers:{
        clearError:(state)=>{
            state.error = null;
        },
        clearSuccessMessage:(state)=>{
            state.successMessage = null
        },
        logout:(state, action) => {
          state.user = null,
          state.isLoggedIn = false;
         Cookies.remove("user"); 
        Cookies.remove("isPremium");
        },
        setPremium:(state,action)=>{
            state.isPremium = action.payload;
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
            state.user = action.payload.token;
            state.isLoggedIn = true;
            state.successMessage = "Login Successful"
            state.isPremium = action.payload.isPremium;
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

        })
        .addCase(getLeaderBoard.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getLeaderBoard.fulfilled, (state,action) => {
            state.loading = false;
            state.leaderBoard = action.payload; 
        })
        .addCase(getLeaderBoard.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;

        })
    }

});


export const authActions = authSlice.actions;
export default authSlice.reducer;
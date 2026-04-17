import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:3000/users"

export const signUp = createAsyncThunk("auth/signup",async (user)=>{
    try{
        const res = await axios.post(API,user);
        console.log(res.data);
        return res.data;
       
    }
    catch(err){
        console.log(err.message);
    }
    

})

export const login = createAsyncThunk("auth/login",async (user)=>{
    try{
        const res = await axios.post(API,user);
        console.log(res);

    }catch(err){
        console.log(err);
    }

})


const authSlice = createSlice({
    name:"auth",
    initialState:{
        list:[],
        email:"",
        isLoggedIn:""
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(signUp.fulfilled,(state,action)=>{
            state.list.push(action.payload);
        })
    }

});

export default authSlice.reducer;
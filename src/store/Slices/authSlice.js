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

export const loginUser = createAsyncThunk("auth/loginUser",async ({email,password})=>{
    try{
        // const res = await axios.post(API,user);
        // console.log(res);
        console.log("Login from reducer",email,password);

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
        .addCase(loginUser.fulfilled,(state,action)=>{
            console.log(action.payload);
        })
    }

});

export default authSlice.reducer;
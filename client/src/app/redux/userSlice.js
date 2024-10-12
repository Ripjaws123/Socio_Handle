'use client'

import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:'user',
    initialState:{
        user:null,
        otherUsers:null,
        profile:null
    },
    reducers:{
        // multiple actions
        getUser:(state,action)=>{
            state.user = action.payload;
        },
        getOtherUsers:(state,action)=>{
            state.otherUsers = action.payload;
        },
        getProfile:(state,action)=>{
            state.profile = action.payload;
        },
        followandUnfollow: (state, action) => {
            if (state.user.following.includes(action.payload)) {
                // unfollow
                state.user.following = state.user.following.filter(
                    (userId) => userId !== action.payload
                );
            } else {
                // follow
                state.user.following.push(action.payload);
            }
        }
        
    }
});

export const {getUser, getOtherUsers, getProfile, followandUnfollow} = userSlice.actions;
export default userSlice.reducer;
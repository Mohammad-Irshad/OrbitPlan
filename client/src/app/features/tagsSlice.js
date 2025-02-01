import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const addNewTag = createAsyncThunk('tag/addNewTag', async (tagData, {rejectWithValue}) => {
    const token = localStorage.getItem('accessToken')
    if(!token){
        return rejectWithValue("No token found")
    }
    try{
        const response = await axios.post(`http://localhost:3000/tags`, tagData, {
            headers : {"Authorization" : `Bearer ${token}`}
        })
        return response.data
    }catch(error){
        console.log(error.response)
        return rejectWithValue(error.response ? error.response.data : error.message || "something went wrong")
    }
})

export const getAllTags = createAsyncThunk('tag/getAllTags', async (_, {rejectWithValue}) => {
    const token = localStorage.getItem('accessToken')
    if(!token){
        return rejectWithValue("No token found")
    }
     try{
        const response = await axios.get(`http://localhost:3000/tags`, {
            headers : {"Authorization" : `Bearer ${token}`}
        })
        return response.data
    }catch(error){
        console.log(error.response)
        return rejectWithValue(error.response ? error.response.data : error.message || "something went wrong")
    }
})

export const tagsSlice = createSlice({
    name : 'tags',
    initialState : {
        allTags : [],
        status : 'idle',
        error : false
    },
    reducers : {

    },
    extraReducers : (builder) => {
        builder
        .addCase(addNewTag.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(addNewTag.fulfilled, (state, action) => {
            state.status = 'success'
            state.allTags.push(action.payload.tag)
        })
        .addCase(addNewTag.rejected, (state, action) => {
            state.status = 'error'
            state.error = action.payload.message
        })
        .addCase(getAllTags.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(getAllTags.fulfilled, (state, action) => {
            state.status = 'success'
            state.allTags = action.payload.tags
        })
        .addCase(getAllTags.rejected, (state, action) => {
            state.status = 'error'
            state.error = action.payload.message
        })
    }

})

export default tagsSlice.reducer
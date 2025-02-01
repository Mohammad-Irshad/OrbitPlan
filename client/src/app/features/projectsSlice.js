import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';


export const addNewProject = createAsyncThunk('project/addNewProject', async (projectData, {rejectWithValue}) => {
    const token = localStorage.getItem('accessToken')
    if(!token){
        return rejectWithValue("No token found")
    }
    try{
        const response = await axios.post(`http://localhost:3000/projects`, projectData, {
            headers : {"Authorization" : `Bearer ${token}`}
        })
        return response.data
    }catch(error){
        console.log(error.response)
        return rejectWithValue(error.response ? error.response.data : error.message || "something went wrong")
    }
})

export const getAllProjects = createAsyncThunk('projects/getAllProjects', async () => {
    const token = localStorage.getItem('accessToken')
    if(!token){
        return rejectWithValue("No token found")
    }
    try{
        const response = await axios.get(`http://localhost:3000/projects`, {
            headers : {
                "Authorization" : `Bearer ${token}`
            }
        })
        return response.data
    }catch(error){
        return error
    }
})


const projectsSlice = createSlice({
    name : "projects",
    initialState : {
        allUserProjects : [],
        status : 'idle',
        error : false
    },
    reducers : {

    },
    extraReducers : (builder) => {
        builder
        .addCase(addNewProject.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(addNewProject.fulfilled, (state, action) => {
            state.status = 'success'
            state.allUserProjects.push(action.payload.project)
        })
        .addCase(addNewProject.rejected, (state, action) => {
            state.status = 'error'
            state.error = action.payload.message
        })
        .addCase(getAllProjects.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(getAllProjects.fulfilled, (state, action) => {
            state.status = 'success'
            state.allUserProjects = action.payload.projects
        })
        .addCase(getAllProjects.rejected, (state, action) => {
            state.status = 'error'
            state.error = action.payload.message
        })
    }
})

export default projectsSlice.reducer
import {configureStore} from "@reduxjs/toolkit"
import  userSlice  from "../features/userSlice"
import projectsSlice from "../features/projectsSlice"
import teamsSlice from "../features/teamsSlice"
import tasksSlice from "../features/tasksSlice"
import tagsSlice from "../features/tagsSlice"

const store = configureStore({
    reducer : {
        user : userSlice,
        projects : projectsSlice,
        teams : teamsSlice,
        tasks : tasksSlice,
        tags : tagsSlice
    }
})

export default store

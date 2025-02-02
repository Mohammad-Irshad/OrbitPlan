import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addNewTask = createAsyncThunk(
  "task/addNewTask",
  async (taskData, { rejectWithValue }) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      return rejectWithValue("No token found");
    }
    try {
      const response = await axios.post(
        `https://orbit-plan.vercel.app/tasks`,
        taskData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(
        error.response
          ? error.response.data
          : error.message || "something went wrong"
      );
    }
  }
);

export const getAllTasks = createAsyncThunk(
  "task/getAllTasks",
  async (queryParams = {}, { rejectWithValue }) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      return rejectWithValue("Not token found");
    }
    try {
      const params = new URLSearchParams();
      Object.entries(queryParams).forEach(([key, value]) => {
        if (value) {
          params.append(key, value); // Add only non-empty parameters
        }
      });
      const response = await axios.get(
        `https://orbit-plan.vercel.app/tasks?${params.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(
        error.response
          ? error.response.data
          : error.message || "something went wrong"
      );
    }
  }
);

export const updateTask = createAsyncThunk(
  "/task/updateTask",
  async ({ id, updatedData }, { rejectWithValue }) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      return rejectWithValue("No token found");
    }
    try {
      const response = await axios.post(
        `https://orbit-plan.vercel.app/tasks/${id}`,
        updatedData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(
        error.response
          ? error.response.data
          : error.message || "something went wrong"
      );
    }
  }
);

export const deleteTask = createAsyncThunk(
  "/task/deleteTask",
  async (id, { rejectWithValue }) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      return rejectWithValue("Not token found");
    }
    try {
      const response = await axios.delete(
        `https://orbit-plan.vercel.app/tasks/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(
        error.response
          ? error.response.data
          : error.message || "something went wrong"
      );
    }
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    status: "idle",
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewTask.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addNewTask.fulfilled, (state, action) => {
        state.status = "success";
        state.tasks.push(action.payload.addedTask);
      })
      .addCase(addNewTask.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload?.message || "Something went wrong";
      })
      .addCase(getAllTasks.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAllTasks.fulfilled, (state, action) => {
        state.status = "success";
        state.tasks = action.payload.tasks;
      })
      .addCase(getAllTasks.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload?.message || "Something went wrong";
      })
      .addCase(updateTask.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.status = "success";
        const taskIndex = state.tasks.findIndex(
          (task) => task._id === action.payload.updatedTask._id
        );
        if (taskIndex) {
          state.tasks[taskIndex] = action.payload.updatedTask;
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload?.message || "Something went wrong";
      })
      .addCase(deleteTask.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.status = "success";
        const taskIndex = state.tasks.findIndex(
          (task) => task._id === action.payload.deletedTask._id
        );
        if (taskIndex) {
          state.tasks = state.tasks.filter(
            (task) => task._id != action.payload.deletedTask._id
          );
        }
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload?.message || "Something went wrong";
      });
  },
});

export default tasksSlice.reducer;

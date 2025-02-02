import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addNewTeam = createAsyncThunk(
  "team/addNewTeam",
  async (teamData, { rejectWithValue }) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      return rejectWithValue("No token found");
    }
    try {
      const response = await axios.post(
        `https://orbit-plan.vercel.app/teams`,
        teamData,
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

export const getAllTeams = createAsyncThunk("teams/getAllTeams", async () => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    return rejectWithValue("No token found");
  }
  try {
    const response = await axios.get(`https://orbit-plan.vercel.app/teams`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    return error;
  }
});

const teamsSlice = createSlice({
  name: "teams",
  initialState: {
    allTeams: [],
    status: "idle",
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewTeam.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addNewTeam.fulfilled, (state, action) => {
        state.status = "success";
        state.allTeams.push(action.payload.team);
      })
      .addCase(addNewTeam.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload?.message || "Something went wrong";
      })
      .addCase(getAllTeams.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAllTeams.fulfilled, (state, action) => {
        state.status = "success";
        state.allTeams = action.payload.teams;
      })
      .addCase(getAllTeams.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload?.message || "Something went wrong";
      });
  },
});

export default teamsSlice.reducer;

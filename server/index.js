const express = require("express");
const cors = require("cors");
const { initializeDatabase } = require("./database/db");
const verifyJWT = require("./middleware/auth.middleware");
const {
  userSignUp,
  userLogIn,
  userDetails,
  allOwners,
} = require("./controllers/user.controller");
const {
  addNewTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("./controllers/tasks.controller");
const { addTeam, getTeams } = require("./controllers/team.controller");
const { addProject, getProjects } = require("./controllers/project.controller");
const { addTag, getTag } = require("./controllers/tag.controller");

const app = express();

app.use(express.json());
app.use(cors());

initializeDatabase();

// Welcome Api

app.get("/", (req, res) => {
  res.send("Welcome to Mohammad Irshad's Server ! Happy Coding.");
});

// User Api
app.post("/auth/signup", userSignUp); // User signup
app.post("/auth/login", userLogIn); // User Login
app.get("/auth/me", verifyJWT, userDetails); // Get user details

// All user api
app.get("/allOwners", verifyJWT, allOwners);

// Task Api
app.post("/tasks", verifyJWT, addNewTask); // create a new task
app.get("/tasks", verifyJWT, getTasks); // Fetch task with filtering
app.post("/tasks/:id", verifyJWT, updateTask); // update a task
app.delete("/tasks/:id", verifyJWT, deleteTask); // delete a task

// Team Api
app.post("/teams", verifyJWT, addTeam); // add a new team
app.get("/teams", verifyJWT, getTeams); // Fetch a list of teams

// Project Api
app.post("/projects", verifyJWT, addProject); // add a new project.
app.get("/projects", verifyJWT, getProjects); // Get all projects

// Tag Api
app.post("/tags", verifyJWT, addTag); // Add new tags
app.get("/tags", verifyJWT, getTag); // get all tags

// const newUserData = {
//     name : "King Khan",
//     rollNo : 1234,
//     class : 12
// }

// async function addUser(userData){
//     try{
//         const user = new TestOne(userData)
//         const saveUser = await user.save()
//         console.log("User added successfully!")
//     }catch(err){
//         console.log("Error occured in adding new user : ",err)
//     }
// }

// addUser(newUserData)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT : ${PORT}`);
});

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { getAllProjects } from "../app/features/projectsSlice";
import { getAllTasks } from "../app/features/tasksSlice";
import { getAllTeams } from "../app/features/teamsSlice";

const Dashboard = () => {
  const [filteredTask, setFilteredTask] = useState([]);

  const dispatch = useDispatch();

  const { logedInUser } = useSelector((state) => state.user);
  const { allUserProjects } = useSelector((state) => state.projects);
  const { tasks } = useSelector((state) => state.tasks);

  const userProjects = allUserProjects.filter(
    (pro) => pro.user === logedInUser._id
  );

  const userTasks = tasks.filter((task) =>
    task.owners.some((owner) => owner._id === logedInUser._id)
  );

  console.log("user tasks : ", userTasks);
  console.log(" tasks : ", tasks);

  const taskFilter = (status) => {
    console.log(status);
    if (!status) {
      setFilteredTask(userTasks);
    } else {
      const filtered = userTasks.filter((task) => task.status === status);
      setFilteredTask(filtered);
    }
  };

  useEffect(() => {
    if (tasks.length != 0 && logedInUser) {
      setFilteredTask(userTasks);
    }
  }, [tasks, logedInUser]);

  useEffect(() => {
    dispatch(getAllProjects());
    dispatch(getAllTasks());
    dispatch(getAllTeams());
  }, []);

  return (
    <div>
      <Header heading={"OrbitPlan - Dashboard"} />
      <main className="container ">
        <div className="row">
          <div className="col-md-2">
            <Sidebar />
          </div>
          <div className="col-md-10">
            <div className="card mt-5 border-success">
              <div className="card-body">
                <h2>Projects</h2>
                <div className="row">
                  {userProjects.length != 0 &&
                    userProjects.map((pro) => (
                      <div className="col-md-3" key={pro._id}>
                        <div className="card">
                          <div className="card-body">
                            <h4 className="card-heading text-success">
                              {pro.name}
                            </h4>
                            <p className="card-text">
                              {pro.description.slice(0, 55)}...
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                <hr className="border border-3 border-success" />
                <section className="my-3">
                  <div className="my-3 d-flex align-items-center">
                    <h2>My Tasks:</h2>
                    <section
                      className="my-3 ms-4 d-flex"
                      style={{ alignItems: "center" }} // Inline flex alignment
                    >
                      <p className="me-4 mb-0" style={{ lineHeight: "1.5" }}>
                        Quick Filters:
                      </p>
                      <select
                        className="form-select"
                        onChange={(e) => taskFilter(e.target.value)}
                        style={{ width: "50%" }}
                      >
                        <option value={""}>Status</option>
                        <option value={"To Do"}>To Do</option>
                        <option value={"In Progress"}>In Progress</option>
                        <option value={"Completed"}>Completed</option>
                        <option value={"Blocked"}>Blocked</option>
                      </select>
                    </section>
                  </div>

                  {/* <hr /> */}
                  <div className="row">
                    {filteredTask.length != 0 ? (
                      filteredTask.map((task) => (
                        <div className="col-md-3" key={task._id}>
                          <div className="card">
                            <div className="card-body">
                              <div card-heading>
                                <h5>{task.name}</h5>
                                <p className="text-secondary">
                                  {(() => {
                                    const dueDate = new Date(task.dueDate);
                                    const day = String(
                                      dueDate.getDate()
                                    ).padStart(2, "0");
                                    const month = String(
                                      dueDate.getMonth() + 1
                                    ).padStart(2, "0");
                                    const year = dueDate.getFullYear();
                                    return `Due Date: ${day}/${month}/${year}`;
                                  })()}
                                </p>
                                <p>Status: {task.status}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>No tasks for now.</p>
                    )}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

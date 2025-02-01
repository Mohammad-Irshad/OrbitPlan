import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Link, useLocation, useParams } from "react-router-dom";
import Dropdown from "../components/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { addNewTask, getAllTasks } from "../app/features/tasksSlice";
import DedicatedSidebar from "../components/DedicatedSidebar";

const UserProject = () => {
  const { id } = useParams();
  const location = useLocation();
  const logedInUserProjects = location.state || {};
  const project = logedInUserProjects.find((project) => project._id == id);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [owner, setOwner] = useState("");
  const [tags, setTags] = useState("");
  const [taskStatus, settaskStatus] = useState("");
  const [sortOption, setSortOption] = useState("Oldest First");

  const [filteredTask, setFilteredTask] = useState([]);

  const { allTeams } = useSelector((state) => state.teams);
  const { allOwners } = useSelector((state) => state.user);
  const { allTags } = useSelector((state) => state.tags);
  const { tasks, status } = useSelector((state) => state.tasks);

  let projectSpecificTasks = tasks.filter((task) => task.project._id === id);

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    team: [],
    owners: [],
    tags: [],
    dueDate: "",
    timeToComplete: "",
  });

  useEffect(() => {
    dispatch(getAllTasks());
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDropdownChange = (type, selectedOptions) => {
    console.log(`Updating ${type} with:`, selectedOptions); // Debug log
    setFormData((prevData) => ({
      ...prevData,
      [type]: selectedOptions,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data on Submit:", formData);
    const submissionData = { ...formData, project: id };
    console.log("Submission data : ", submissionData);
    try {
      const result = await dispatch(addNewTask(submissionData)).unwrap();
      console.log(result);
      setErrorMessage(null);
      setSuccessMessage(result.message);
      setFormData({
        name: "",
        team: [],
        owners: [],
        tags: [],
        timeToComplete: "",
      });
      dispatch(getAllTasks());
    } catch (error) {
      setSuccessMessage(null);
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    applyFilters();
  }, [owner, tags, taskStatus, successMessage]);

  useEffect(() => {
    applySort(sortOption);
  }, [sortOption]);

  const applyFilters = async () => {
    try {
      // Collect active filters
      const filters = {};
      if (owner) filters.owner = owner;
      if (tags) filters.tags = tags;
      if (taskStatus) filters.status = taskStatus;

      // Dispatch a single API call with combined filters
      const updatedTasks = await dispatch(getAllTasks(filters)).unwrap();

      console.log("Updated tasks are :", updatedTasks);

      let projectSpecificTasks = updatedTasks.tasks.filter(
        (task) => task.project._id === id
      );

      console.log("Project specific tasks are : ", projectSpecificTasks);

      setFilteredTask(projectSpecificTasks || []); // Update the filtered tasks state
    } catch (error) {
      console.error("Error applying filters:", error);
    }
  };

  const applySort = (sortOption) => {
    if (sortOption) {
      const sortedTasks = [...filteredTask].sort((a, b) => {
        if (sortOption === "Due Date")
          return new Date(a.dueDate) - new Date(b.dueDate);
        if (sortOption === "Newest First")
          return new Date(b.createdAt) - new Date(a.createdAt);
        if (sortOption === "Oldest First")
          return new Date(a.createdAt) - new Date(b.createdAt);
      });
      console.log("Sorted Task : ", sortedTasks);
      setFilteredTask(sortedTasks);
    }
  };

  const clearFilter = () => {
    setOwner("");
    setTags("");
    settaskStatus("");
    setSortOption("Oldest First");
  };

  return (
    <>
      <Header heading={`Project: ${project.name}`} />
      <main className="container">
        <div className="row">
          <div className="col-md-2">
            <DedicatedSidebar text={"Go To Projects"} navigateTo={"projects"} />
          </div>
          <div className="col-md-10 mt-5">
            <div className="card">
              <div className="card-body">
                <h3 className="text-center mb-3">Task List</h3>
                <section className="d-flex justify-content-around">
                  <div className="d-flex">
                    <label className="form-label me-3">Filters: </label>
                    <select
                      className="form-select me-3"
                      value={owner}
                      onChange={(e) => setOwner(e.target.value)}
                      style={{ width: "50%" }}
                    >
                      <option value={""}>By Owner</option>
                      {allOwners.map((own) => (
                        <option key={own.name} value={own._id}>
                          {own.name}
                        </option>
                      ))}
                    </select>
                    <select
                      className="form-select me-3"
                      value={tags}
                      style={{ width: "50%" }}
                      onChange={(e) => setTags(e.target.value)}
                    >
                      <option value={""}>By Tag</option>
                      {allTags.map((tg) => (
                        <option key={tg.name} value={tg.name}>
                          {tg.name}
                        </option>
                      ))}
                    </select>
                    <select
                      className="form-select"
                      value={taskStatus}
                      style={{ width: "50%" }}
                      onChange={(e) => settaskStatus(e.target.value)}
                    >
                      <option value={""}>By Status</option>
                      <option value={"To Do"}>To Do</option>
                      <option value={"In Progress"}>In Progress</option>
                      <option value={"Completed"}>Completed</option>
                      <option value={"Blocked"}>Blocked</option>
                    </select>
                    <button
                      className="btn btn-outline-danger mx-3"
                      onClick={() => clearFilter()}
                    >
                      Clear
                    </button>
                  </div>
                  <div className="d-flex">
                    <label className="form-label me-3">Sort: </label>
                    <select
                      className="form-select me-3"
                      value={sortOption}
                      style={{ width: "80%" }}
                      onChange={(e) => setSortOption(e.target.value)}
                    >
                      <option value={"Oldest First"}>Oldest First</option>
                      <option value={"Newest First"}>Newest First</option>
                      <option value={"Due Date"}>Due Date</option>
                    </select>
                  </div>
                </section>
                <hr />
                {status === "loading" && <p>Loading...</p>}
                {status === "success" && filteredTask.length != 0 ? (
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">S. No.</th>
                        <th scope="col">Task Name</th>
                        <th scope="col">Status</th>
                        <th scope="col">Owners</th>
                        <th scope="col">Due Date</th>
                        <th scope="col">Time To Complete</th>
                        <th scope="col">Go To Task</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTask.map((task, index) => (
                        <tr key={task._id + index}>
                          <th scope="row">{index + 1}</th>
                          <td>{task.name}</td>
                          <td>{task.status}</td>
                          <td>
                            {task.owners.map((own) => own.name).join(", ")}
                          </td>
                          <td>
                            {(() => {
                              const dueDate = new Date(task.dueDate);
                              const day = String(dueDate.getDate()).padStart(
                                2,
                                "0"
                              );
                              const month = String(
                                dueDate.getMonth() + 1
                              ).padStart(2, "0");
                              const year = dueDate.getFullYear();
                              return `${day}/${month}/${year}`;
                            })()}
                          </td>
                          <td>{task.timeToComplete} Days</td>
                          <td>
                            <Link
                              className="list-group-item list-group-item-action"
                              to={`/task/${task._id}`}
                            >
                              <i className="fa-solid fa-right-long"></i>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>You don't have any task!</p>
                )}
                <button
                  type="button"
                  className="btn btn-primary mt-3"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Add New Task
                </button>
              </div>
            </div>
          </div>
        </div>

        <section>
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Create New Task for : {project.name}
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form>
                    <label className="form-label">Task Name: </label>
                    <input
                      className="form-control"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                    <label className="form-label">Team: </label>
                    <select
                      className="form-select"
                      name="team"
                      onChange={handleInputChange}
                    >
                      <option value={""}>Select Team</option>
                      {allTeams.map((team) => (
                        <option key={team._id} value={team._id}>
                          {team.name}
                        </option>
                      ))}
                    </select>
                    <Dropdown
                      label={"Owners"}
                      options={allOwners.map((owner) => ({
                        id: owner._id,
                        name: owner.name,
                      }))}
                      selectedOptions={formData.owners}
                      onSelectionChange={(selected) =>
                        handleDropdownChange("owners", selected)
                      }
                    />
                    <Dropdown
                      label={"Tags"}
                      options={allTags.map((tag) => ({
                        id: tag._id,
                        name: tag.name,
                      }))}
                      selectedOptions={formData.tags}
                      onSelectionChange={(selected) => {
                        handleDropdownChange("tags", selected);
                      }}
                    />
                    <label className="form-label">Due Date: </label>
                    <input
                      type="date"
                      className="form-control mb-2"
                      name="dueDate"
                      value={formData.dueDate}
                      onChange={handleInputChange}
                      required
                    />
                    <label className="form-label ">Time (Days): </label>
                    <input
                      className="form-control"
                      type="number"
                      name="timeToComplete"
                      value={formData.timeToComplete}
                      onChange={handleInputChange}
                      required
                    />
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={(e) => handleSubmit(e)}
                  >
                    Add Task
                  </button>
                </div>
                <br />
                {successMessage && (
                  <p className="text-success text-center">{successMessage}</p>
                )}
                {errorMessage && (
                  <p className="text-danger text-center">{errorMessage}</p>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default UserProject;

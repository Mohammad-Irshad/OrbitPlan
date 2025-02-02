import React, { useEffect, useState, useCallback } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTask,
  getAllTasks,
  updateTask,
} from "../app/features/tasksSlice";
import DedicatedSidebar from "../components/DedicatedSidebar";
import Dropdown from "../components/Dropdown";

const Task = () => {
  const { id } = useParams();

  const { tasks } = useSelector((state) => state.tasks);
  const { allUserProjects } = useSelector((state) => state.projects);
  const { allTeams } = useSelector((state) => state.teams);
  const { allOwners } = useSelector((state) => state.user);
  const { allTags } = useSelector((state) => state.tags);

  const thisTask = tasks.find((task) => task._id === id);

  console.log("This task : ", thisTask);

  const [formData, setFormData] = useState({
    name: "",
    team: "", // Store team ID, not name
    owners: [],
    tags: [],
    status: "",
    dueDate: "",
    timeToComplete: "",
  });

  // console.log("Form data : ", formData);

  useEffect(() => {
    if (thisTask) {
      setFormData({
        name: thisTask.name || "",
        team: thisTask.team?._id || "", // Store team ID for select dropdown
        owners: thisTask.owners.map((own) => own._id) || [],
        tags: thisTask.tags || [],
        status: thisTask.status,
        dueDate: thisTask.dueDate ? thisTask.dueDate.split("T")[0] : "",
        timeToComplete: thisTask.timeToComplete || "",
      });
    }
  }, [thisTask]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const project = allUserProjects.find((pro) => pro._id === thisTask.project);
  // const team = allTeams.find((team) => team._id === thisTask.team);
  // const owners = thisTask.owners.map((own) =>
  //   allOwners.find((alOwn) => alOwn._id === own)
  // );

  const handleDropdownChange = (type, selectedOptions) => {
    console.log(`Updating ${type} with:`, selectedOptions); // Debug log
    setFormData((prevData) => ({
      ...prevData,
      [type]: selectedOptions,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const completeHadler = (id) => {
  //   const updatedData = { status: "Completed" };
  //   dispatch(updateTask({ id, updatedData }));
  // };

  // const submitHandler = () => {
  //   console.log("Form data", formData);
  //   dispatch(updateTask({ id, updatedData: formData }));
  // };

  const completeHadler = useCallback(
    (id) => {
      const updatedData = { status: "Completed" };
      dispatch(updateTask({ id, updatedData }));
    },
    [dispatch] // Dependencies
  );

  const submitHandler = useCallback(() => {
    console.log("Form data", formData);
    dispatch(updateTask({ id, updatedData: formData }));
  }, [dispatch, id, formData]); // Dependencies

  useEffect(() => {
    dispatch(getAllTasks());
  }, [dispatch]);

  const deleteHandler = (id) => {
    dispatch(deleteTask(id));
    navigate("/projects");
  };

  return (
    <>
      <Header heading={`Task : ${thisTask.name}`} />
      <main className="container">
        <div className="row">
          <div className="col-md-2">
            <DedicatedSidebar text={"Go To Projects"} navigateTo={"projects"} />
          </div>
          <div className="col-md-10 mt-5">
            <div className="card border-success">
              <div className="card-body">
                <h3 className="text-center">Task Details</h3>
                <hr />
                <p>
                  <strong>Project:</strong> {thisTask.project.name}{" "}
                </p>
                {/* <p><strong>Project:</strong> {project.name} </p> */}
                <p>
                  <strong>Team:</strong> {thisTask.team.name}
                </p>
                <p>
                  <strong>Owners:</strong>{" "}
                  {thisTask.owners.map((own) => (
                    <span key={own._id}>{own.name} </span>
                  ))}
                </p>
                <p>
                  <strong>Tags:</strong>{" "}
                  {thisTask.tags.map((tag, ind) => (
                    <span key={ind}>#{tag} </span>
                  ))}{" "}
                </p>
                <hr />
                <p>
                  <strong>Status:</strong> {thisTask.status}{" "}
                </p>
                <p>
                  <strong>Time Remaining:</strong> {thisTask.timeToComplete}{" "}
                  Days{" "}
                </p>
                <div className="d-flex justify-content-between">
                  {thisTask.status === "Completed" ? (
                    <button className="btn btn-primary">Task Completed</button>
                  ) : (
                    <button
                      className="btn btn-success"
                      onClick={() => completeHadler(thisTask._id)}
                    >
                      Mark As Completed
                    </button>
                  )}
                  <button
                    type="button"
                    class="btn btn-outline-success"
                    data-bs-toggle="modal"
                    data-bs-target={`#editTask${thisTask._id}`}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteHandler(thisTask._id)}
                  >
                    Delete Task
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section>
          <div
            className="modal fade"
            id={`editTask${thisTask._id}`}
            tabIndex="-1"
            aria-labelledby={`editTaskLabel${thisTask._id}`}
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1
                    className="modal-title fs-5"
                    id={`editTaskLabel${thisTask._id}`}
                  >
                    Edit Task
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
                      value={formData.team}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Team</option>
                      {allTeams.map((team) => (
                        <option key={team._id} value={team._id}>
                          {team.name}
                        </option>
                      ))}
                    </select>
                    <label className="form-label">Status: </label>
                    <select
                      className="form-select"
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                    >
                      <option value="">Select status</option>
                      <option value="To Do">To Do</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Blocked">Blocked</option>
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
                    type="button"
                    className="btn btn-primary"
                    onClick={() => submitHandler()}
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Task;

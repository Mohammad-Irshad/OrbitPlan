import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { addNewProject, getAllProjects } from "../app/features/projectsSlice";
import { Link } from "react-router-dom";
import { getAllTeams } from "../app/features/teamsSlice";
import { getAllOwners } from "../app/features/userSlice";
import { getAllTags } from "../app/features/tagsSlice";

const Projects = () => {
  const dispatch = useDispatch();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // const {logedInUser} = useSelector((state) => state.user)
  const logedInUser = {
    name: "Guest User",
    email: "guestUser@gmail.com",
    _id: `677237b0df4bb43597a4373a`,
  };
  const { allUserProjects, status } = useSelector((state) => state.projects);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    user: `${logedInUser._id}`,
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    const projectExists = allUserProjects.some(
      (project) => project.name.toLowerCase() === formData.name.toLowerCase()
    );

    if (projectExists) {
      setSuccessMessage(null);
      setErrorMessage("Project name already exists.");
      return;
    }
    try {
      const result = await dispatch(addNewProject(formData)).unwrap();
      setErrorMessage(null);
      setSuccessMessage(result.message);
    } catch (error) {
      setSuccessMessage(null);
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    dispatch(getAllProjects());
    dispatch(getAllTeams());
    dispatch(getAllOwners());
    dispatch(getAllTags());
  }, []);

  const cleanModal = () => {
    setSuccessMessage(null);
    setErrorMessage(null);
    setFormData({
      name: "",
      description: "",
      user: `${logedInUser._id}`,
    });
  };

  const logedInUserProjects = allUserProjects.filter(
    (project) => project.user === logedInUser._id
  );

  return (
    <>
      <Header heading={"Projects Management"} />
      <main className="container">
        <div className="row">
          <div className="col-md-2">
            <Sidebar />
          </div>
          <div className="col-md-10 mt-5">
            <div className="card border-success">
              <div className="card-body">
                <h3 className="text-center">Projects List</h3>
                <hr />
                {status === "loading" && <p>Loading...</p>}
                {status === "success" && logedInUserProjects.length != 0 ? (
                  <div className="list-group">
                    {logedInUserProjects.map((project) => {
                      return (
                        <Link
                          to={`/userProject/${project._id}`} // Navigates to a project detail page
                          key={project._id}
                          className="list-group-item list-group-item-action"
                          state={logedInUserProjects}
                          style={{ display: "block", textDecoration: "none" }} // Optional: Styling
                        >
                          <strong className="text-success">
                            {project.name}
                          </strong>{" "}
                          : {project.description}
                        </Link>
                      );
                    })}
                  </div>
                ) : (
                  <p>
                    You don't have any project add one by clicking on Add New
                    Project.
                  </p>
                )}
                <button
                  type="button"
                  className="btn btn-primary mt-3"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                  onClick={cleanModal}
                >
                  Add New Project
                </button>
              </div>
            </div>
          </div>
        </div>

        <section>
          <div
            className="modal fade"
            id="staticBackdrop"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="staticBackdropLabel">
                    Add New Project
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
                    <label className="form-label" htmlFor="projectName">
                      Project Name:
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="projectName"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                    <br />
                    <label className="form-label" htmlFor="projectDescription">
                      Project Description:
                    </label>
                    <textarea
                      className="form-control"
                      id="projectDescription"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                    ></textarea>
                  </form>
                  <br />
                  {successMessage && (
                    <p className="text-center text-success">{successMessage}</p>
                  )}
                  {errorMessage && (
                    <p className="text-center text-danger">{errorMessage}</p>
                  )}
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
                    onClick={(e) => submitHandler(e)}
                  >
                    Add Project
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

export default Projects;

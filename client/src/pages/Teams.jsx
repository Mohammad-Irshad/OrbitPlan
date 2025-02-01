import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addNewTeam, getAllTeams } from "../app/features/teamsSlice";

const Teams = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const { allTeams, status } = useSelector((state) => state.teams);

  console.log(allTeams);

  const submitHandler = async (e) => {
    e.preventDefault();
    const teamExists = allTeams.some(
      (team) => team.name.toLowerCase() === formData.name.toLowerCase()
    );

    if (teamExists) {
      setSuccessMessage(null);
      setErrorMessage("Team name already exists.");
      return;
    }
    try {
      const result = await dispatch(addNewTeam(formData)).unwrap();
      setErrorMessage(null);
    } catch (error) {
      setSuccessMessage(null);
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    console.log("Inside useeffect : ", allTeams);
    dispatch(getAllTeams());
  }, []);

  const cleanModal = () => {
    setSuccessMessage(null);
    setErrorMessage(null);
    setFormData({
      name: "",
      description: "",
    });
  };

  return (
    <>
      <Header heading={"Teams Management"} />
      <main className="container">
        <div className="row">
          <div className="col-md-2">
            <Sidebar />
          </div>
          <div className="col-md-10 mt-5">
            <div className="card">
              <div className="card-body">
                <h3 className="text-center">Teams List</h3>
                <hr />
                {status === "loading" && <p>Loading...</p>}
                {status === "success" && allTeams.length > 0 ? (
                  <div className="list-group">
                    {allTeams.map((team) => {
                      return (
                        <Link
                          // to={`/projects/${project._id}`} // Navigates to a project detail page
                          key={team._id}
                          className="list-group-item list-group-item-action"
                          style={{ display: "block", textDecoration: "none" }} // Optional: Styling
                        >
                          <strong className="text-success">{team.name}</strong>{" "}
                          : {team.description}
                        </Link>
                      );
                    })}
                  </div>
                ) : (
                  <p>
                    You don't have any team yet, add one by clicking on Add New
                    Team.
                  </p>
                )}
                <button
                  type="button"
                  className="btn btn-primary mt-3"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                  onClick={cleanModal}
                >
                  Add New Team
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
                    Add New Team
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
                    <label className="form-label" htmlFor="teamName">
                      Team Name:
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="teamName"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                    <br />
                    <label className="form-label" htmlFor="teamDescription">
                      Team Description:
                    </label>
                    <textarea
                      className="form-control"
                      id="teamDescription"
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
                    Add Team
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

export default Teams;

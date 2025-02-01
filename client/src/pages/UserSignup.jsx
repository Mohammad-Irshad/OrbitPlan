import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signUpUser } from "../app/features/userSlice";
import { Link } from "react-router-dom";

const UserSignup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();

  const signupHandler = async (e) => {
    e.preventDefault();
    console.log("Name : ", name, "Email : ", email, "Password : ", password);
    const userDetails = { name, email, password };
    try {
      const result = await dispatch(signUpUser(userDetails)).unwrap(); // Wait for the action to complete
      console.log("Signup Successful: ", result);
      setErrorMessage(null);
      setSuccessMessage(result.message);
    } catch (error) {
      console.log(error);
      console.error("Signup Failed: ", error.message);
      setSuccessMessage(null);
      setErrorMessage(
        error.message || error.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <main className="p-5 m-5 d-flex justify-content-center">
      <div
        className="container m-5"
        style={{ maxWidth: "500px", margin: "auto" }}
      >
        <div className="card">
          <div className="card-body">
            <h5 className="card-title text-center">OrbitPlan - Signup </h5>
            <form onSubmit={signupHandler}>
              <label className="form-lable">Name: </label>
              <br />
              <input
                className="form-control"
                type="text"
                placeholder="Enter Name"
                onChange={(e) => setName(e.target.value)}
              />
              <br />
              <label className="form-lable">Email: </label>
              <br />
              <input
                className="form-control"
                type="email"
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <label className="form-lable">Password: </label>
              <br />
              <input
                className="form-control"
                type="text"
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
              <button type="submit" className="btn btn-success">
                Signup
              </button>
              {successMessage && <p>{successMessage}</p>}
              {errorMessage && <p>{errorMessage}</p>}
            </form>
            <Link to={"/login"}>
              <p className="text-center mt-3">
                Already have an account click here to login
              </p>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default UserSignup;

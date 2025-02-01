import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../app/features/userSlice";
import { Link, useNavigate } from "react-router-dom";

const UserLogin = () => {
  const [email, setEmail] = useState("guestUser@gmail.com");
  const [password, setPassword] = useState("121001@Gu");
  const [errorMessage, setErroMessage] = useState(null);
  const [loading, setLoading] = useState(null);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const loginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const userDetails = { email, password };
    try {
      const result = await dispatch(loginUser(userDetails)).unwrap();
      navigate("/dashboard");
      // console.log("Login successful : ",result)
      setLoading(false);
    } catch (err) {
      // console.log("Login failed : ", err.message || err.response?.data?.message || "Something went wrong")
      setErroMessage(err.message);
      setLoading(false);
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
            <h5 className="card-title text-center">OrbitPlan - Login </h5>
            <form onSubmit={loginHandler}>
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
              <button type="submit" className="btn btn-primary">
                Login
              </button>
              {errorMessage != null && <p>{errorMessage}</p>}
            </form>
            {loading && <p className="mt-2 fs-6 text-success">Loading...</p>}
            <p className="text-center">Click login to login as Guest User!</p>
            <Link to={"/signup"}>
              <p className="mt-3 text-center">
                Don't have an account click here to singup
              </p>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default UserLogin;

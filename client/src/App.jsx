import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="container text-center py-5">
        <div className="row">
          <div className="col-md-6"></div>
          <div className="col-md-6"></div>
        </div>
        <Link to={"/login"}>Click here to go to the - login page</Link>
        <br />
        <br />
        <Link to={"/signup"}>Click here to go to the - signup page</Link>
      </div>
    </>
  );
}

export default App;

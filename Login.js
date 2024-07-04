import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const [username, updateUsername] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.clear();
  }, []);
  const ProceedLogin = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("proceed");
      fetch("http://localhost:8000/user/" + username)
        .then((res) => {
          return res.json();
        })
        .then((resp) => {
          console.log(resp);
          if (Object.keys(resp).length === 0) {
            toast.error("please enter valis username");
          } else {
            if (resp.password === password) {
              toast.success("Login successful");
              sessionStorage.setItem("username", username);
              navigate("/");
            } else {
              toast.error("please enter valis password");
            }
          }
        })
        .catch((err) => {
          toast.error("login failed:" + err.message);
        });
    }
  };
  const validate = () => {
    let result = true;
    if (username === "" || username === null) {
      result = false;
      toast.warning("please enter username");
    }
    if (password === "" || password === null) {
      result = false; 
      toast.warning("please enter password");
    }
    return result;
  };
  return (
    <div>
      <div className="row">
        <div className="offset-lg-3 col-lg-6 s" style={{ marginTop: "100px" }}>
          <form onSubmit={ProceedLogin} className="container">
            <div className="card">
              <div className="card-header">
                <h2>USer Login</h2>
              </div>
              <div className="card-body">
                <div className="form-group">
                  <label>
                    User name<span className="errmsg"></span>
                  </label>
                  <input
                    value={username}
                    onChange={(e) => updateUsername(e.target.value)}
                    className="form-control"
                  ></input>
                </div>
                <div className="form-group">
                  <label>
                    Password<span className="errmsg">*</span>
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                    className="form-control"
                  ></input>
                </div>
              </div>
              <div className="card-footer">
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
                <Link className="btn btn-success" to={"/register"}>
                  New User
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

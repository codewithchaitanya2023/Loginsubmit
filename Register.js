import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function Register() {
  const [id, changeId] = useState("");
  const [name, setname] = useState("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const [Country, setcountry] = useState("");
  const [phone, setphone] = useState("");
  const [address, setaddress] = useState("");
  const [gender, setgender] = useState("false");
  const navigate = useNavigate();
  const ISValidate = () => {
    let isproceed = true;
    let errormessage = "please enter the value in";
    if (id === null || id === "") {
      isproceed = false;
      errormessage += "username";
    }
    if (name === null || name === "") {
      isproceed = false;
      errormessage += "Fullname";
    }

    if (password === null || id === "") {
      isproceed = false;
      errormessage += "password";
    }

    if (email === null || email === "") {
      isproceed = false;
      errormessage += "Email";
    }
    if (!isproceed) {
      toast.warning(errormessage);
    } else {
      if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
      } else {
        isproceed = false;
        toast.warning("please enter valid email");
      }
    }
    return isproceed;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let regobj = { id, password, name, email, phone, Country, gender, address };
    console.log(regobj);
    if (ISValidate()) {
      fetch("http://localhost:8000/user", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(regobj),
      })
        .then((res) => {
          if (res.ok) {
            toast.success("Register successfully");
            navigate("/login");
          } else {
            return res.json().then((data) => {
              throw new Error(data.message || "Registration failed");
            });
          }
        })
        .catch((err) => {
          toast.error("Register failed! " + err.message);
        });
    }
  };
  return (
    <div>
      <div className="offset-lg-3 col-lg-6">
        <form className="container" onSubmit={handleSubmit}>
          <div className="card">
            <div className="card-header">
              <h2>User Registration</h2>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      User name <span className="errmsg">*</span>
                    </label>
                    <input
                      value={id}
                      onChange={(e) => changeId(e.target.value)}
                      className="form-control"
                    ></input>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      password <span className="errmsg">*</span>
                    </label>
                    <input
                      value={password}
                      onChange={(e) => setpassword(e.target.value)}
                      className="form-control"
                    ></input>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      Full name<span className="errmsg">*</span>
                    </label>
                    <input
                      value={name}
                      onChange={(e) => setname(e.target.value)}
                      className="form-control"
                    ></input>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      email<span className="errmsg">*</span>
                    </label>
                    <input
                      value={email}
                      onChange={(e) => setemail(e.target.value)}
                      className="form-control"
                    ></input>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      Phone<span className="errmsg">*</span>
                    </label>
                    <input
                      value={phone}
                      onChange={(e) => setphone(e.target.value)}
                      className="form-control"
                    ></input>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      Country<span className="errmsg">*</span>
                    </label>
                    <select
                      value={Country}
                      onChange={(e) => setcountry(e.target.value)}
                      className="form-control"
                    >
                      <option value="india">India</option>
                      <option value="usa">USA</option>
                      <option value="canada">CANADA</option>
                      <option value="rashia">Rashia</option>
                    </select>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      gender<span className="errmsg">*</span>
                    </label>
                    <br></br>
                    <input
                      type="radio"
                      checked={gender === "male"}
                      onChange={(e) => setgender(e.target.value)}
                      name="gender"
                      value="male"
                      className="app-check"
                    ></input>
                    <label>male</label>
                    <input
                      type="radio"
                      checked={gender === "female"}
                      onChange={(e) => setgender(e.target.value)}
                      name="gender"
                      value="female"
                      className="app-check"
                    ></input>
                    <label>female</label>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      address<span className="errmsg">*</span>
                    </label>
                    <input
                      value={address}
                      onChange={(e) => setaddress(e.target.value)}
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="card-footer">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
              <Link className="btn btn-danger" to={"/login"}>
                close
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

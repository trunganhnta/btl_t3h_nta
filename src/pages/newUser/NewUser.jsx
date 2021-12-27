import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import "./newUser.css";
import TopBar from "../../components/topBar/TopBar";
import Sidebar from "../../components/sidebar/Sidebar";
import app from "../../fisebase";
import { toast } from "react-toastify";
import { OpenInNewOffTwoTone } from "@mui/icons-material";

const initialState = {
  username: "",
  email: "",
  contact: "",
  fullname: "",
  password: "",
  date: "",
};
export default function NewUser() {
  const [state, setState] = useState(initialState);
  const [data, setData] = useState({});

  const { username, email, contact, fullname, password, date  } = state;

  const history = useHistory();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !email || !contact || !fullname || !password || !date) {
      toast.error("Please provide value in each input field");
    } 
    else {
      app.child("contacts").push(state, (err) => {
        if (err) {
          toast.err(err);
        } else {
          toast.success("Contact Added Successfully");
        }
      });
      setTimeout(() => history.push("/users"),500);
    }
  };
  return (
    <div>
      <TopBar />
      <div className="container">
        <Sidebar />
        <div className="newUser">
          <h1 className="newUserTitle">Create new user</h1>
          <form action="" className="newUserForm" onSubmit={handleSubmit}>
            <div className="newUserItem">
              <label>UserName</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Your name...."
                value={username || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="newUserItem">
              <label>FullName</label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                placeholder="Your fullname...."
                value={fullname || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="newUserItem">
              <label>Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your email...."
                value={email || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="newUserItem">
              <label>PassWord</label>
              <input
                type="text"
                id="password"
                name="password"
                placeholder="Your password...."
                value={password || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="newUserItem">
              <label>PhoneNumber</label>
              <input
                type="number"
                id="contact"
                name="contact"
                placeholder="Your contact...."
                value={contact || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="newUserItem">
              <label>DateOfBirth</label>
              <input
                type="date"
                id="date"
                name="date"
                placeholder="Your Date of Birth...."
                value={date || ""}
                onChange={handleInputChange}
              />
            </div>
            
            <button type="submit" value="Save" className="newUserButton">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

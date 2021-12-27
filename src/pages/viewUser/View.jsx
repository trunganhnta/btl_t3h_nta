import React, { useState, useEffect } from "react";
import app from "../../fisebase";
import {  useParams, Link } from "react-router-dom";
import "./view.css";
import TopBar from "../../components/topBar/TopBar";
import Sidebar from "../../components/sidebar/Sidebar";

export default function View() {
  const [user, setUser] = useState({});
  const { id } = useParams();

  useEffect(() => {
    app
      .child(`contacts/${id}`)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          setUser({ ...snapshot.val() });
        } else {
          setUser({});
        }
      });
  }, [id]);

  console.log(user);
  return (
    <div>
      <TopBar />
      <div className="container">
        <Sidebar />
        <div className="view">
          <div className="card">
            <div className="card-header">
              <p>User Detail</p>
            </div>
            <div className="containerView">
              <strong>ID: </strong>
              <span>{id}</span>
              <br />
              <br />
              <strong>USerName: </strong>
              <span>{user.username}</span>
              <br />
              <br />
              <strong>FullName: </strong>
              <span>{user.fullname}</span>
              <br />
              <br />
              <strong>DateOFBirth: </strong>
              <span>{user.date}</span>
              <br />
              <br />
              <strong>Email: </strong>
              <span>{user.email}</span>
              <br />
              <br />
              <strong>Contact: </strong>
              <span>{user.contact}</span>
              <br />
              <br />
              <strong>PassWord: </strong>
              <span>{user.password}</span>
              <br />
              <br />
              <Link to="/users">
                <button type="submit" className="btn btn-back">
                  Go Back
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import TopBar from "../../components/topBar/TopBar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./searchUser.css";
import app from "../../fisebase";

export default function SearchUser() {
  const [data, setData] = useState({});

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();
  let search = query.get("username");
  console.log("username", search);

  useEffect(() => {
    searchData();
  }, [search]);

  const searchData = () => {
    app
      .child("contacts")
      .orderByChild("username")
      .equalTo(search)
      .on("value", (snapshot) => {
        if (snapshot.val()) {
          const data = snapshot.val();
          setData(data);
          console.log("data", data);
        }
      });
  };
  return (
    <div>
      <TopBar />
      <div className="container">
        <Sidebar />
        <div className="searchUser">
            <Link to="/users">
            <button className="btn btn-edit " style={{float: 'right',marginTop:'60px',marginRight:"330px"}}>Go Back</button>
            </Link>
          {Object.keys(data).length === 0 ? (
            <h2 style={{marginTop:"100px",marginLeft:"360px"}}>No search found with that Username: {query.get("username")}</h2>
          ) : (
            <table className="styled-table">
              <thead>
                <tr>
                  <th style={{ textAlign: "center" }}>No.</th>
                  <th style={{ textAlign: "center" }}>Name</th>
                  <th style={{ textAlign: "center" }}>FullName</th>
                  <th style={{ textAlign: "center" }}>DateOfBirth</th>
                  <th style={{ textAlign: "center" }}>Email</th>
                  <th style={{ textAlign: "center" }}>Contact</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(data).map((id, index) => {
                  return (
                    <tr key={id}>
                      <th scope="row">{index + 1}</th>
                      <td>{data[id].username}</td>
                      <td>{data[id].fullname}</td>
                      <td>{data[id].date}</td>
                      <td>{data[id].email}</td>
                      <td>{data[id].contact}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

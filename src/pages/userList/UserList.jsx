import "./userList.css";
import TopBar from "../../components/topBar/TopBar";
import Sidebar from "../../components/sidebar/Sidebar";
import { Link, useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import app from "../../fisebase";
import { toast } from "react-toastify";

export default function UserList() {
  const [data, setData] = useState({});
  const [search, setSearch] = useState("");
  const [sortedData, setSortedData] = useState([]);
  const [sort, setSort] = useState(false);

  const history = useHistory();

  useEffect(() => {
    app.child("contacts").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setData({ ...snapshot.val() });
      } else {
        setData({});
      }
    });
    return () => {
      setData({});
    };
  }, []);
  const onDelete = (id) => {
    if (window.confirm("Are you sure that you wanted to delete that user ?")) {
      app.child(`contacts/${id}`).remove((err) => {
        if (err) {
          toast.error(err);
        } else {
          toast.success("Contact deleted successfully");
        }
      });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/searchUser?username=${search}`);
    setSearch("");
  };

  const handleChange = (e) => {
    setSort(true);
    app
      .child("contacts")
      .orderByChild(`${e.target.value}`)
      .on("value", (snapshot) => {
        let sortedData = [];
        snapshot.forEach((snap) => {
          sortedData.push(snap.val());
        });
        setSortedData(sortedData);
      });
  };
  const handleReset = () => {
    setSort(false);
  };
  return (
    <div>
      <TopBar />
      <div className="container">
        <Sidebar />
        <div className="userList">
          <div>
            <form
              action=""
              onSubmit={handleSubmit}
              className="custom-formSearch"
            >
              <input
                type="text"
                className="inputField"
                placeholder="Search user....."
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
            </form>
          </div>
          <table className="styled-table">
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>No.</th>
                <th style={{ textAlign: "center" }}>Name</th>
                <th style={{ textAlign: "center" }}>FullName</th>
                <th style={{ textAlign: "center" }}>DateOfBirth</th>
                <th style={{ textAlign: "center" }}>Email</th>
                <th style={{ textAlign: "center" }}>Contact</th>
                {!sort && <th style={{ textAlign: "center" }}>Action</th>}
              </tr>
            </thead>
            {!sort && (
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
                      <td>
                        <Link to={`/user/${id}`}>
                          <button className="btn btn-edit">Edit</button>
                        </Link>
                        <button
                          className="btn btn-delete"
                          onClick={() => onDelete(id)}
                        >
                          Delete
                        </button>
                        <Link to={`/viewUser/${id}`}>
                          <button className="btn btn-view">View</button>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            )}
            {sort && (
              <tbody>
                {sortedData.map((item, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{item.username}</td>
                      <td>{item.fullname}</td>
                      <td>{item.date}</td>
                      <td>{item.email}</td>
                      <td>{item.contact}</td>
                    </tr>
                  );
                })}
              </tbody>
            )}
          </table>
          <div className="custom-sort">
            <label>Sort By: </label>
            <select
              className="dropdown"
              name="colValue"
              onChange={handleChange}
            >
              <option>Please Select</option>
              <option value="username">Name</option>
              <option value="fullname">Full Name</option>
              <option value="email">Email</option>
              <option value="contact">Contact</option>
              <option value="date">Date Of Birth</option>
            </select>
            <button
              type="submit"
              className="btn btn-reset"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

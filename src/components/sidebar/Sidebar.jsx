import React from "react";
import "./sidebar.css";
import { Home, MultilineChart, TrendingUp } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="customLink">
              <li className="sidebarListItem active">
                <Home className="sidebarIcon" />
                Home
              </li>
            </Link>
            <li className="sidebarListItem">
              <MultilineChart className="sidebarIcon" />
              Analytics
            </li>
            <li className="sidebarListItem">
              <TrendingUp className="sidebarIcon" />
              Sale
            </li>
          </ul>

          <h3 className="sidebarTitle">Manage User</h3>
          <ul className="sidebarList">
            <Link to="/users" className="customLink">
              <li className="sidebarListItem ">
                <Home className="sidebarIcon" />
                Users
              </li>
            </Link>
            <Link to="/newUser" className="customLink">
            <li className="sidebarListItem">
              <TrendingUp className="sidebarIcon" />
              Add New User
            </li>
            </Link>
          </ul>
          <h3 className="sidebarTitle">Manage Products</h3>
          <ul className="sidebarList">
          <Link to="/products" className="customLink">
            <li className="sidebarListItem ">
              <Home className="sidebarIcon" />
              Products
            </li>
            </Link>
            <Link to="/newProduct" className="customLink">
            <li className="sidebarListItem">
              <MultilineChart className="sidebarIcon" />
              Add New Product
            </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}

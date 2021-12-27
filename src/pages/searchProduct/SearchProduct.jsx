import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import TopBar from "../../components/topBar/TopBar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./searchProduct.css";
import app from "../../fisebase";

export default function SearchProduct() {
  const [data, setData] = useState({});

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();
  let search = query.get("productName");
  console.log("username", search);

  useEffect(() => {
    searchData();
  }, [search]);

  const searchData = () => {
    app
      .child("products")
      .orderByChild("productName")
      .equalTo(search)
      .on("value", (snapshot) => {
        if (snapshot.val()) {
          const data = snapshot.val();
          setData(data);
        }
      });
  };
  return (
    <div>
      <TopBar />
      <div className="container">
        <Sidebar />
        <div className="searchProduct">
            <Link to="/products">
            <button className="btn btn-edit " style={{float: 'right',marginTop:'60px',marginRight:"330px"}}>Go Back</button>
            </Link>
          {Object.keys(data).length === 0 ? (
            <h2 style={{marginTop:"100px",marginLeft:"360px"}}>No search found with that Username: {query.get("productName")}</h2>
          ) : (
            <table className="styled-table">
              <thead>
                <tr>
                  <th style={{ textAlign: "center" }}>No.</th>
                  <th style={{ textAlign: "center" }}>Product Image</th>
                  <th style={{ textAlign: "center" }}>Product Name</th>
                  <th style={{ textAlign: "center" }}>Price</th>
                  <th style={{ textAlign: "center" }}>Product Detail</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(data).map((id, index) => {
                  return (
                    <tr key={id}>
                      <th scope="row">{index + 1}</th>
                      <td><img src={data[id].productImg} alt="" className="custom-img" /></td>
                      <td>{data[id].productName}</td>
                      <td>{data[id].productPrice}</td>
                      <td>{data[id].productDetail}</td>
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

import React, { useState, useEffect } from "react";
import app from "../../fisebase";
import {  useParams, Link } from "react-router-dom";
import "./viewProduct.css";
import TopBar from "../../components/topBar/TopBar";
import Sidebar from "../../components/sidebar/Sidebar";

export default function ViewProduct() {
  const [product, setProduct] = useState({});
  const { id } = useParams();

  useEffect(() => {
    app
      .child(`products/${id}`)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
            setProduct({ ...snapshot.val() });
        } else {
            setProduct({});
        }
      });
  }, [id]);

  return (
    <div>
      <TopBar />
      <div className="container">
        <Sidebar />
        <div className="viewProduct">
          <div className="card">
            <div className="card-header">
              <p>Product Detail</p>
            </div>
            <div className="containerView">
                <img src={product.productImg} alt="" />
                <br/>
              <strong>ID: </strong>
              <span>{id}</span>
              <br />
              <br />
              <strong>Product Name: </strong>
              <span>{product.productName}</span>
              <br />
              <br />
              <strong>Price: </strong>
              <span>{product.productPrice}</span>
              <br />
              <br />
              <strong>Detail: </strong>
              <span>{product.productDetail}</span>
              <br />
              <br />
              <Link to="/products">
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

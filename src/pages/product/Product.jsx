import { Publish } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Sidebar from "../../components/sidebar/Sidebar";
import TopBar from "../../components/topBar/TopBar";
import "./product.css";
import app from "../../fisebase";

// import {db} from "../../fisebase"
const initialState = {
  productName: "",
  productPrice: "",
  productImg: "null",
  productDetail: "",
};

export default function Product() {
  const { id } = useParams();

  const [data, setData] = useState({});

  const [state, setState] = useState(initialState);

  const { productName, productPrice, productImg, productDetail } = state;

  const history = useHistory();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productName || !productPrice || !productImg || !productDetail) {
      toast.error("Please provide value in each input field");
    } else {
      if (!id) {
        app.child("products").push(state, (err) => {
          if (err) {
            toast.err(err);
          } else {
            toast.success("products Added Successfully");
          }
        });
      } else {
        app.child(`products/${id}`).set(state, (err) => {
          if (err) {
            toast.err(err);
          } else {
            toast.success("products Update Successfully");
          }
        });
      }
      setTimeout(() => history.push("/products"), 500);
    }
  };

  useEffect(() => {
    app.child("products").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setData({ ...snapshot.val() });
      } else {
        setData({});
      }
    });
    return () => {
      setData({});
    };
  }, [id]);
  useEffect(() => {
    if (id) {
      setState({ ...data[id] });
    } else {
      setState({ ...initialState });
    }
    return () => {
      setState({ ...initialState });
    };
  }, [id, data]);

  return (
    <div>
      <TopBar />
      <div className="container">
        <Sidebar />
        <div className="product">
          <div className="productTitleContainer">
            <h1 className="productTitle">Product</h1>
            <Link to="/newProduct">
              <button type="submit" className="productAddButton">
                Create
              </button>
            </Link>
          </div>
          <div className="productTop">
            <div className="productTopLeft">
              <div className="productInfoTop">
                <img src={productImg} alt="" className="productInfoImg" />
                <span className="productName">{productName}</span>
              </div>
              <div className="productInfoBottom">
                <div className="productInfoItem">
                  <span className="productInfoKey">Id: </span>
                  <div className="productInfoValue">{id} </div>
                </div>
                <div className="productInfoItem">
                  <span className="productInfoKey">Product Name: </span>
                  <span className="productInfoValue">{productName} </span>
                </div>
                <div className="productInfoItem">
                  <span className="productInfoKey">Product price: </span>
                  <span className="productInfoValue">{productPrice} </span>
                </div>
                <div className="productInfoItem">
                  <span className="productInfoKey">Product detail: </span>
                  <span className="productInfoValue">{productDetail} </span>
                </div>
              </div>
            </div>
            <div className="productTopRight"></div>
          </div>
          <div className="productBottom">
            <form action="" className="productForm" onSubmit={handleSubmit}>
              <div className="productFormLeft">
                <label htmlFor="">Product Name</label>
                <input
                  type="text"
                  name="productName"
                  value={productName}
                  onChange={handleInputChange}
                />
                <label htmlFor="">Price</label>
                <input
                  type="text"
                  name="productPrice"
                  value={productPrice}
                  onChange={handleInputChange}
                />
                <label htmlFor="">Detail</label>
                <input
                  type="text"
                  name="productDetail"
                  value={productDetail}
                  onChange={handleInputChange}
                />
              </div>
              <div className="productFormRight">
                <div className="productUpload">
                  <img
                    src={productImg}
                    alt=""
                    name="productImg"
                    className="productUploadImg"
                    onChange={handleInputChange}
                  />
                  <label htmlFor="file">
                    <Publish />
                  </label>
                  <input
                    type="file"
                    name="file"
                    id="file"
                    style={{ display: "none" }}
                  />
                </div>
                <button type="submit" className="productButton">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

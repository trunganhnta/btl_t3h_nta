import { Publish } from "@mui/icons-material";
import React, { useState, useContext } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import TopBar from "../../components/topBar/TopBar";
import "./newProduct.css";
import {storage, db } from "../../fisebase"
import { useHistory } from "react-router-dom";
import app from "../../fisebase";


export default function NewProduct() {

  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState(0);
  const [productImg, setProductImg] = useState(null);
  const [productDetail, setProductDetail] = useState('');

  const [error, setError] = useState("");

  const history = useHistory();

  const types = ["image/png", "image/jpeg"];
  const productImgHandler = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile && types.includes(selectedFile.type)) {
      setProductImg(selectedFile);
      setError("");
    } else {
      setProductImg(null);
      setError("Please select a valid image type png or jpg");
    }
  };
  const addProduct = (e) => {
    e.preventDefault();
    // console.log(productName, productPrice, productImg);
    // console.log("err", error);
    const uploadTask = storage.ref(`product-images/${productImg.name}`).put(productImg);
    uploadTask.on('state_changed',snapshot => {
      const process = (snapshot.bytesTransferred/snapshot.totalBytes) * 100;
      console.log("process", process);
    },err=>{
      setError(err.message)
    },()=>{
      storage.ref('product-images').child(productImg.name).getDownloadURL().then(url=>{
        // db.collection('Products').add({
        app.child('products').push({
          productName: productName,
          productPrice: Number(productPrice),
          productDetail: productDetail,
          productImg: url
        }).then(()=>{
          setProductName('');
          setProductPrice(0);
          setProductDetail('');
          setProductImg('');
          setError('');
          document.getElementById('file').value = '';
          setTimeout(() => history.push("/products"),500);
        }).catch(err=>setError(err.message));
      })
    })
  };

  return (
    <div>
      <TopBar />
      <div className="container">
        <Sidebar />
        <div className="newProduct">
          <h1 className="newProductTitle">Create new Product</h1>
          <form action="" className="newProductForm" onSubmit={addProduct}>
            <div className="newProductItem">
              <label>Product Name</label>
              <input
                type="text"
                className="form-control"
                name="productname"
                placeholder="Product name...."
                required
                onChange={(e) => setProductName(e.target.value)}
                value={productName}
              />
            </div>
            <div className="newProductItem">
              <label>Product Price</label>
              <input
                type="number"
                className="form-control"
                name="price"
                placeholder="Product price...."
                required
                onChange={(e) => setProductPrice(e.target.value)}
                value={productPrice}
              />
            </div>
            <div className="newProductItem">
            <label>Product Detail</label>
              <textarea
                rows="3" cols="50"
                className="form-control"
                name="price"
                placeholder="Product detail...."
                required
                onChange={(e) => setProductDetail(e.target.value)}
                value={productDetail}
              />
            </div>
            <div className="newProductItem custom-input">
              <label>Product Image</label>
              <input
                type="file"
                id="file"
                name="file"
                onChange={productImgHandler}
              />
            </div>
            
            <button type="submit" value="Save" className="newProductButton">
              Save
            </button>
          </form>
          {error && <span>{error}</span>}
        </div>
      </div>
    </div>
  );
}

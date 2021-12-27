import "./productList.css";
import TopBar from "../../components/topBar/TopBar";
import Sidebar from "../../components/sidebar/Sidebar";
import { Link, useHistory } from "react-router-dom";
import React, { useState, useEffect, createContext } from "react";
import { toast } from "react-toastify";
import { db } from "../../fisebase";
import { AlertDialog } from "./../../common/common";
import { Box } from "@material-ui/core";
import { Typography, Button } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import app from "../../fisebase";

export default function ProductList() {
  const [currentId, setCurrentId] = useState("");

  const [search, setSearch] = useState("");
  const [searched,setSearched] = useState(false)

  const [sortedData, setSortedData] = useState([]);
  const [sort, setSort] = useState(false);

  const [open, setOpen] = useState(false);

  const handleDialogOpen = () => setOpen(true);
  const handleDialogClose = () => setOpen(false);

  const history = useHistory();

  const DialogContent = () => (
    <Box p={2}>
      <Box textAlign="center">
        <ErrorOutlineIcon style={{ fontSize: "50px", color: "red" }} />
      </Box>
      <Box>
        <Typography variant="h6" color="textSecondary" alignItems="center">
          Are you sure to delete ?
        </Typography>
      </Box>
      <Box textAlign="right">
        <Button
          variant="container"
          color="default"
          onClick={() => handleDialogClose()}
          style={{
            background: "gray",
            marginTop: "10px",
            width: "40px",
            height: "30px",
          }}
        >
          Cancel
        </Button>
        <Button
          variant="container"
          color="secondary"
          onClick={() => {
            // DeleteData({ id: currentId });
            // setFetched(false);
            onDelete(currentId);
            handleDialogClose();
            // console.log("currentId", currentId);
          }}
          style={{
            background: "orange",
            marginTop: "10px",
            marginLeft: "10px",
            width: "40px",
            height: "30px",
          }}
        >
          Delete
        </Button>
      </Box>
    </Box>
  );
  const [data, setData] = useState({});
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
  }, []);
  const onDelete = (id) => {
    // if (window.confirm("Are you sure that you wanted to delete that user ?")) {
    app.child(`products/${id}`).remove((err) => {
      if (err) {
        toast.error(err);
      } else {
        toast.success("Contact deleted successfully");
      }
    });
    // }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/searchProduct?productName=${search}`);
    setSearch("");
  };

  
  const [result,setResult] = useState([]);
  useEffect(()=>{
    if(search.length > 0){
      fetch('https://auth-development-88100-default-rtdb.firebaseio.com/products.json').then(
        response => response.json()
      ).then(responseData => {
        setResult(responseData);
        console.log("responseData name",responseData)
        console.log("result",result);

        let searchQuery = search.toLowerCase();
        console.log("responseData",responseData)
        
        for(const key in responseData){
          let product = responseData[key].productName.toLowerCase();
          if(product.slice(0, searchQuery.length).indexOf(searchQuery) !== -1){
              // setResult(prevResult =>{
              //   console.log("prevResult",prevResult)
              //   console.log("responseData[key]",responseData[key])

              //   return [...prevResult, responseData[key]]
              setResult(responseData[key])
              // })
          }
        }
      }).catch(error =>{
        console.log(error)
      })
    }else{
      setResult([]);
    }
  },[search])
  
  const handleChange = (e) => {
    setSort(true);
    app
      .child("products")
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
        <div className="productList">
          <div>
            <form
              action=""
              onSubmit={handleSubmit}
              className="custom-formSearch"
            >
              <input
                type="text"
                className="inputField"
                placeholder="Search product....."
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
            </form>
            {/* {result.map((result,index) => (
              <a href="#" key={index}>
                <div>
                  {result}
                </div>
              </a>
            ))} */}
          </div>
          <AlertDialog
            open={open}
            DialogContent={DialogContent}
            handleClose={handleDialogClose}
          />

          <table className="styled-table">
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>No.</th>
                <th style={{ textAlign: "center" }}>Product Image</th>
                <th style={{ textAlign: "center" }}>Product Name</th>
                <th style={{ textAlign: "center" }}>Price</th>
                <th style={{ textAlign: "center" }}>Product Detail</th>
                {!sort &&<th style={{ textAlign: "center" }}>Action</th>}
              </tr>
            </thead>
            {!sort && (
            <tbody>
              {/* {products.map((item, i) => ( */}
              {Object.keys(data).map((id, index) => {
                return (
                  <tr key={id}>
                    {/* <td>{i + 1}</td> */}
                    <th scope="row">{index + 1}</th>
                    <td>
                      <img
                        src={data[id].productImg}
                        alt={data[id]}
                        className="custom-productImg"
                      />
                    </td>
                    <td>{data[id].productName}</td>
                    <td>{data[id].productPrice}</td>
                    <td>{data[id].productDetail}</td>
                    <td>
                      <Link to={`/product/${id}`}>
                        <button className="btn btn-edit">Edit</button>
                      </Link>
                      <button
                        className="btn btn-delete"
                        onClick={() => {
                          handleDialogOpen();
                          setCurrentId(id);
                        }}
                      >
                        Delete
                      </button>
                      <Link to={`/viewProduct/${id}`}>
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
                      <td><img src={item.productImg} alt="" className="custom-productImg" /></td>
                      <td>{item.productName}</td>
                      <td>{item.productPrice}</td>
                      <td>{item.productDetail}</td>
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
              <option value="productName">Product Name</option>
              <option value="productDetail">Detail</option>
              <option value="productPrice">Price</option>
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

import "./user.css";
import {
  PersonOutline,
  PhoneAndroid,
  MailOutline,
  LocationSearching,
  DateRange,
  FileDownload,
} from "@mui/icons-material";
import { useHistory, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import TopBar from "../../components/topBar/TopBar";
import Sidebar from "../../components/sidebar/Sidebar";
import app from "../../fisebase";

const initialState = {
  username: "",
  email: "",
  contact: "",
  fullname: "",
  password: "",
  date: "",
};
export default function User() {
  const { id } = useParams();

  const [data, setData] = useState({});

  const [state, setState] = useState(initialState);

  const { username, email, contact, fullname, password, date } = state;

  const history = useHistory();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !email || !contact || !fullname || !password || !date) {
      toast.error("Please provide value in each input field");
    } else {
      if (!id) {
        app.child("contacts").push(state, (err) => {
          if (err) {
            toast.err(err);
          } else {
            toast.success("Contact Added Successfully");
          }
        });
      }else{
        app.child(`contacts/${id}`).set(state, (err) => {
          if (err) {
            toast.err(err);
          } else {
            toast.success("Contact Update Successfully");
          }
        });
      }
      setTimeout(() => history.push("/users"), 500);
    }
  };

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
        <div className="user">
          <div className="userTitleContainer">
            <h1 className="userTitle">Edit User </h1>
            <Link to="/newUser">
              <button className="userAddButton">Create</button>
            </Link>
          </div>
          <div className="userContainer">
            <div className="userShow">
              <div className="userShowTop">
                <img
                  src="https://talkpro.edu.vn/wp-content/uploads/2017/11/nhung-hinh-nen-gai-xinh-dep-nhat-2018.jpg"
                  alt=""
                  className="userShowImg"
                />
                <div className="userShowTopTitle">
                  <span className="userShowUsername">{username}</span>
                  <span className="userShowUserTile">Software Engineer</span>
                </div>
              </div>
              <div className="userShowBottom">
                <span className="userShowBottomTitle">Account Details</span>
                <div className="userShowInfo">
                  <PersonOutline className="userShowIcon" />
                  <span className="userShowInfoTitle">{fullname}</span>
                </div>
                <div className="userShowInfo">
                  <DateRange className="userShowIcon" />
                  <span className="userShowInfoTitle">{date}</span>
                </div>
                <span className="userShowBottomTitle">Contact Details</span>
                <div className="userShowInfo">
                  <PhoneAndroid className="userShowIcon" />
                  <span className="userShowInfoTitle">{contact}</span>
                </div>
                <div className="userShowInfo">
                  <MailOutline className="userShowIcon" />
                  <span className="userShowInfoTitle">{email}</span>
                </div>
                <div className="userShowInfo">
                  <LocationSearching className="userShowIcon" />
                  <span className="userShowInfoTitle">VietNam</span>
                </div>
              </div>
            </div>
            <div className="userUpdate">
              <span className="userUpdateTitle">Edit</span>
              <form
                action=""
                className="userUpdateForm"
                onSubmit={handleSubmit}
              >
                <div className="userUpdateLeft">
                  <div className="userUpdateItem">
                    <label htmlFor="">UserName</label>
                    <input
                      type="text"
                      className="UserUpdateInput"
                      name="username"
                      value={username || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="userUpdateItem">
                    <label htmlFor="">FullName</label>
                    <input
                      type="text"
                      placeholder=""
                      className="UserUpdateInput"
                      name="fullname"
                      value={fullname || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="userUpdateItem">
                    <label htmlFor="">DateOfBirth</label>
                    <input
                      type="text"
                      placeholder=""
                      className="UserUpdateInput"
                      name="date"
                      value={date || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="userUpdateItem">
                    <label htmlFor="">Email</label>
                    <input
                      type="text"
                      placeholder=""
                      className="UserUpdateInput"
                      name="email"
                      value={email || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="userUpdateItem">
                    <label htmlFor="">Contact</label>
                    <input
                      type="text"
                      className="UserUpdateInput"
                      name="contact"
                      value={contact || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="userUpdateRight">
                  <div className="userUpdateUpload">
                    <img
                      src="https://talkpro.edu.vn/wp-content/uploads/2017/11/nhung-hinh-nen-gai-xinh-dep-nhat-2018.jpg"
                      alt=""
                      className="userUpdateImg"
                    />
                    <label htmlFor="userUpdateRightImg">
                      <FileDownload className="userUpdateIcon" />
                    </label>
                    <input type="file" id="userUpdateRightImg" />
                  </div>
                  <button
                    type="submit"
                    value="Update"
                    className="userUpdateButton"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

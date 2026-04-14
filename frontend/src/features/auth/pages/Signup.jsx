import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handlefaliure, handlesuccess } from "../utils";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Signup = () => {
  let navigate =useNavigate()
  let [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  let handleonchange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  let handlesubmit = async (e) => {
    e.preventDefault();
    if (data.name == "" || data.email == "" || data.password == "") {
      return handlefaliure("All the field are required");
    }
    try {
      let res = await axios.post("http://localhost:3000/api/auth/register",data,{  withCredentials: true});
      console.log(res.data);
      
      if(res.data.success){
        handlesuccess(res.data.message)
        setTimeout(() => {
        navigate("/");
      }, 2000);
      }else{
         return handlefaliure(res.data.message)
      }
    } catch (error) {
      handlefaliure(error);
    }
  };
  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={handlesubmit}>
        <h1>Name</h1>
        <input
          type="text"
          placeholder="enter your name"
          name="name"
          autoFocus
          onChange={handleonchange}
          value={data.name}
        />
        <h1>Email</h1>
        <input
          type="text"
          placeholder="enter your Email"
          name="email"
          onChange={handleonchange}
          value={data.email}
        />
        <h1>Password</h1>
        <input
          type="text"
          placeholder="enter your Password"
          name="password"
          onChange={handleonchange}
          value={data.password}
        />
        <br />
        <button type="submit">Signup</button>
        <br />
        <br />
        <Link to={"/login"}>Already have an account </Link>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Signup;

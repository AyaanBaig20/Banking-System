import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handlefaliure, handlesuccess } from "../utils";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../hook/useAuth"
import { useSelector } from "react-redux";

const Signup = () => {
  const loading = useSelector((state)=>state.auth.loading)
  let {handleSignup} = useAuth()
  let navigate = useNavigate();
  
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
      let res = await handleSignup({name:data.name,email:data.email,password:data.password})
      if(res.success){
        handlesuccess(res.message)
        setTimeout(() => {
          navigate("/")
        }, 3000);
      }else{
        handlefaliure(res.message)
      }
    } catch (error) {
      handlefaliure(error);
    }
  };
  
  return (
    <>
    {loading ?(
    <div>
      <h1>Loading</h1>
    </div>
    ) : (
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
          type="password"
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
    )}
    </>
  );
};

export default Signup;

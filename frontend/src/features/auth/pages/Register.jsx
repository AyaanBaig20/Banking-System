import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handlefaliure, handlesuccess } from "../utils";
import {useAuth} from "../hook/useAuth"
import axios from "axios";
import { useSelector } from "react-redux";

const Register = () => {
  let navigate = useNavigate();
    const loading = useSelector((state)=>state.auth.loading)
  let {handleLogin} = useAuth()

  let [data, setData] = useState({
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

    if (data.email === "" || data.password === "") {
      return handlefaliure("All fields are required");
    }

    try {
      let res = await handleLogin({email:data.email,password:data.password})
      if (res.success) {
        handlesuccess(res.message);

        setTimeout(() => {
          navigate("/");
        }, 2000);

      } else {
        handlefaliure(res.message);
      }

    } catch (error) {
      handlefaliure(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handlesubmit}>
        <h1>Email</h1>
        <input
          type="text"
          placeholder="enter your Email"
          name="email"
          autoFocus
          onChange={handleonchange}
          value={data.email}
        />

        <h1>Password</h1>
        <input
          type="password"   // ✅ important
          placeholder="enter your Password"
          name="password"
          onChange={handleonchange}
          value={data.password}
        />

        <br />
        <button type="submit">Login</button>

        <br /><br />

        <Link to={"/signup"}>Don't have an account?</Link>
      </form>

      <ToastContainer />
    </div>
  );
};

export default Register;
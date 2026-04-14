import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handlefaliure, handlesuccess } from "../utils";
import axios from "axios";

const Register = () => {
  let navigate = useNavigate();

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
      let res = await axios.post(
        "http://localhost:3000/api/auth/login", 
        data,
        { withCredentials: true }
      );

      if (res.data.success) {
        handlesuccess(res.data.message);

        setTimeout(() => {
          navigate("/");
        }, 2000);

      } else {
        handlefaliure(res.data.message);
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
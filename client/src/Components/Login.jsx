import React, { useState } from "react";
import "./Login.css";
import { IoIosMail } from "react-icons/io";
import { FaUserCircle, FaLock } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      const { data } = await axios.post("/dashboard", {
        email,
        password,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        toast.success("Login successful");
        navigate("/dashboard");
      }
    } catch (error) {}
  };
  return (
    <div className="login">
      <div className="login-head">
        <h1>Log in</h1>
      </div>
      <form onSubmit={loginUser} className="login-form">
        <span>
          <FaUserCircle />
        </span>
        <div className="login-mail">
          <span>
            <IoIosMail />
          </span>
          <input
            type="email"
            placeholder="Enter your email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
        </div>
        <div className="login-password">
          <span>
            <FaLock />
          </span>
          <input
            type="password"
            placeholder="Enter your password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
        </div>
        <div className="login-links">
          <label>
            Remember me{" "}
            <span className="check">
              <input type="checkbox" name="" id="" />
            </span>
          </label>
          <label htmlFor="">Forgot your password?</label>
        </div>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

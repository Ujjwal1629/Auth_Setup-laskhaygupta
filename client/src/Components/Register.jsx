import React, { useState } from "react";
import axios from "axios";
import "./Register.css";
import { toast } from "react-hot-toast";
//Icons
import { FaUser } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { SlCalender } from "react-icons/sl";
import { FaLock } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    dob: "",
    email: "",
    password: "",
  });
  const registerUser = async (e) => {
    e.preventDefault();
    const { name, dob, email, password } = data;
    try {
      const data = await axios.post("/register", {
        email,
        password,
        name,
        dob,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        toast.success("Registration successful");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="register">
      <div className="sign-up">
        <h1>Sign Up</h1>
      </div>
      <form onSubmit={registerUser} className="sign-up-form">
        <span>
          <FaUserCircle />
        </span>
        <div className="sign-up-name">
          <span>
            <FaUser />
          </span>
          <input
            type="text"
            placeholder="Enter your name"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
        </div>
        <div className="sign-up-dob">
          <span>
            <SlCalender />
          </span>
          <input
            type="date"
            placeholder="Enter your date of birth"
            value={data.dob}
            onChange={(e) => setData({ ...data, dob: e.target.value })}
          />
        </div>
        <div className="sign-up-mail">
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
        <div className="sign-up-password">
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
        <div className="sign-up-links">
          <label>
            Remember me{" "}
            <span className="check">
              <input type="checkbox" name="" id="" />
            </span>
          </label>
          <label htmlFor="">Forgot your password?</label>
        </div>
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
}

//1d50AMQXMFCj6TLX

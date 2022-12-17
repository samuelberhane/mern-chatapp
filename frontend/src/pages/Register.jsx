import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../utils/apiRoutes";
import { toastOption } from "../utils/toastOption";
import { useGlobalUserContext } from "../context/userContext";

const Register = () => {
  const { dispatch } = useGlobalUserContext();
  const [inputValues, setInputValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  // handle input changes
  const handleChange = (e) => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };

  // check validation
  const handleValidation = () => {
    const { username, email, password, confirmPassword } = inputValues;
    if (!email) {
      toast.error("Email Required!", toastOption);
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Password don't match with confirm password!", toastOption);

      return false;
    }
    if (username.length < 4) {
      toast.error("Minimum username length should be 4!", toastOption);
      return false;
    }

    if (password.length < 8) {
      toast.error("Minimum password length should be 8!", toastOption);
      return false;
    }
    return true;
  };

  // submit register form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = handleValidation();

    console.log(validation);
    if (validation) {
      const { username, email, password } = inputValues;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });
      if (data.status === false) toast.error(data.message, toastOption);
      if (data.status === true) {
        dispatch({ type: "REGISTER", payload: data.message });
        navigate("/login");
        setInputValues({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      }
    }
  };

  return (
    <section>
      <FormContainer>
        <h1 className="title">Chat With Family And Friends!</h1>
        <form className="form" onSubmit={handleSubmit}>
          <h1 className="appName">Connection</h1>
          <div className="formInputs">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={inputValues.username}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={inputValues.email}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={inputValues.password}
              onChange={handleChange}
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={inputValues.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="submit">
            Register
          </button>
          <Link to="/login">
            <p className="authLink">Already have an account? Login</p>
          </Link>
        </form>
      </FormContainer>
      <ToastContainer />
    </section>
  );
};

const FormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  height: 100vh;
  .title {
    font-size: 2.5rem;
    max-width: 400px;
    text-align: center;
  }
  .form {
    background-color: #02192c;
    padding: 1.5rem;
    border-radius: 20px;
    .appName {
      text-align: center;
      font-size: 2rem;
    }
    .formInputs {
      display: flex;
      flex-direction: column;
      input {
        padding: 0.5rem 1rem;
        margin-top: 1.2rem;
        border: 3px solid #0f36a1;
        outline: none;
        border-radius: 7px;
        font-size: 1rem;
      }
    }
    .submit {
      width: 100%;
      padding: 0.4rem;
      border: none;
      margin-top: 1rem;
      border-radius: 7px;
      background-color: #ee2df5;
      color: #fff;
      font-size: 1rem;
      text-transform: uppercase;
    }
    .authLink {
      text-align: center;
      color: #e5ec9f;
      font-size: 14px;
      margin-top: 0.3rem;
    }
  }
`;

export default Register;

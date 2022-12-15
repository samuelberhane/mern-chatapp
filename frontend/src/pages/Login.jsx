import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <section>
      <FormContainer>
        <h1 className="title">Chat With Family And Friends!</h1>
        <form className="form">
          <h1 className="appName">Connection</h1>
          <div className="formInputs">
            <input type="text" id="username" placeholder="Username" />
            <input type="password" id="Password" placeholder="Password" />
          </div>
          <button type="submit" className="submit">
            Login
          </button>
          <Link to="/register">
            <p className="authLink">Don't have an account? Register</p>
          </Link>
        </form>
      </FormContainer>
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
        margin-top: 1.3rem;
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
      font-size: 1rem;
      color: #fff;
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

export default Login;

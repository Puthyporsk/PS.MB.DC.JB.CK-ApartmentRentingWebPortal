import React, { useState } from "react";
import { Redirect } from "react-router";

import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "./Login.css";
import Logo from "./logo.png";

const Login = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [openSignupModal, setOpenSignupModal] = useState(false);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupName, setSignupName] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(loginEmail);
    console.log(loginPassword);

    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
        }),
      });

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      console.log("responseData: ", responseData.user);

      props.getUserInfo(responseData.user);
      setLoggedIn(true);
    } catch (err) {
      console.log(err.message || "Something went wrong, please try again");
    }
  };

  const handleSignup = async () => {
    console.log(signupEmail);
    console.log(signupPassword);

    try {
      const response = await fetch("http://localhost:5000/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: signupName,
          email: signupEmail,
          password: signupPassword,
        }),
      });

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      console.log("responseData: ", responseData.user);

      props.getUserInfo(responseData.user);
      setLoggedIn(true);
    } catch (err) {
      console.log(err.message || "Something went wrong, please try again");
    }
  };

  return (
    <React.Fragment>
      {loggedIn && <Redirect to="/homepage" />}
      <div>
        <img src={Logo} alt="apartment-logo" className="logo" />
      </div>

      <form>
        <div className="input-wrapper">
          <div className="email-input">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e) => setLoginEmail(e.target.value)}
            />
          </div>
          <div className="password-input">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={(e) => setLoginPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="login-button">
          <button
            type="submit"
            className="btn btn-primary btn-lg active"
            onClick={(e) => handleLogin(e)}
          >
            Login
          </button>
        </div>
        <div className="signup-button">
          <h5 className="sign-up-text">Don't have an account? Sign-up</h5>
          <button
            type="submit"
            className="btn btn-secondary btn-lg active"
            onClick={(e) => {
              e.preventDefault();
              setOpenSignupModal(true);
            }}
          >
            Sign-up
          </button>
        </div>
      </form>

      {/* Signup Modal should be put into a separate component later */}
      <Modal show={openSignupModal} animation={false}>
        <Modal.Header closeButton onClick={() => setOpenSignupModal(false)}>
          <Modal.Title>Create an Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="input-wrapper">
            <div className="name-input">
              <label>Name</label>
              <input
                type="name"
                className="form-control"
                id="exampleInputName1"
                aria-describedby="nameHelp"
                onChange={(e) => setSignupName(e.target.value)}
              />
            </div>
            <div className="email-input">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={(e) => setSignupEmail(e.target.value)}
              />
            </div>
            <div className="password-input">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                onChange={(e) => setSignupPassword(e.target.value)}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="modal-footer">
          <Button
            className="modal-close-button"
            variant="secondary"
            onClick={() => setOpenSignupModal(false)}
          >
            Close
          </Button>
          <Button
            className="modal-submit-button"
            variant="primary"
            onClick={() => {
              setOpenSignupModal(false);
              handleSignup();
            }}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default Login;

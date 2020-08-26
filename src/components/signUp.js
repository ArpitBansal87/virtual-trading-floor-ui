import React from "react";
import useSignInForm from "../hooks/CustomHooks";
import * as constants from "./../constants/URLConstants";
import { useHistory } from "react-router-dom";

const SignUp = () => {
  console.log(constants.AUTHENTICATION_URL.SIGN_UP);

  let history = useHistory();
  const signUp = () => {
    console.log(constants);
    const formSubmitURL =
      process.env.REACT_APP_HTTP_API_URL + constants.AUTHENTICATION_URL.SIGN_UP;
    fetch(formSubmitURL, {
      method: "POST",
      body: {
        firstName: inputs.firstName,
        lastName: inputs.lastName,
        email: inputs.email,
        usserName: inputs.userName,
        password: inputs.password,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.isAuthenticated) history.push("/dashboard");
      });
  };

  const { inputs, handleInputChange, handleSubmit } = useSignInForm(
    { firstName: "", lastName: "", email: "", userName: "", password: "" },
    signUp
  );

  return (
    <form onSubmit={handleSubmit}>
      <div className="signUp">
        <label>First Name</label>
        <input
          type="text"
          name="firstName"
          required
          onChange={handleInputChange}
          value={inputs.firstName}
        />
        <label>Last Name</label>
        <input
          type="text"
          name="lastName"
          required
          onChange={handleInputChange}
          value={inputs.lastName}
        />
      </div>
      <div>
        <label>Email Address</label>
        <input
          type="email"
          name="email"
          required
          onChange={handleInputChange}
          value={inputs.email}
        />
      </div>
      <div>
        <label>User Name</label>
        <input
          type="text"
          name="userName"
          onChange={handleInputChange}
          value={inputs.userName}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          onChange={handleInputChange}
          value={inputs.password}
        />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUp;

import React, {useState} from "react";
import useSignInForm from "../hooks/CustomHooks";
import * as constants from "./../constants/URLConstants";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./../css/signInPage.css";
import { Typography } from "@material-ui/core";

const SignUp = () => {
  let history = useHistory();
  const [error, setError] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  const signUp = () => {
    const formSubmitURL =
      process.env.REACT_APP_HTTP_API_URL + constants.AUTHENTICATION_URL.SIGN_UP;
    fetch(formSubmitURL, {
      method: "POST",
      body: JSON.stringify({
        firstName: inputs.firstName,
        lastName: inputs.lastName,
        userName: inputs.userName,
        password: inputs.password,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.isUserSignUpSuccessfull) {
          // history.push("/dashboard");
          setSuccessMsg(true);
          setError(false);
        } else {
          setError(true);
          setSuccessMsg(false);
        }
      });
  };

  const { inputs, handleInputChange, handleSubmit } = useSignInForm(
    { firstName: "", lastName: "", userName: "", password: "" },
    signUp
  );

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-element">
        <TextField
          type="text"
          name="firstName"
          required
          label="First Name"
          onChange={handleInputChange}
          value={inputs.firstName}
        />
      </div>
      <div className="form-element">
        <TextField
          type="text"
          name="lastName"
          required
          label="Last Name"
          onChange={handleInputChange}
          value={inputs.lastName}
        />
      </div>
      <div className="form-element">
        <TextField
          type="text"
          name="userName"
          label="Username"
          onChange={handleInputChange}
          value={inputs.userName}
          required
        />
      </div>
      <div className="form-element">
        <TextField
          type="password"
          name="password"
          label="Password"
          onChange={handleInputChange}
          value={inputs.password}
          required
        />
      </div>
      <div className="form-element">
        <Button variant="contained" color="primary" type="submit">
          Sign Up
        </Button>
      </div>
      {error ? <Typography color="error"> Incorrect credentials provided</Typography> : ''}
      {successMsg ? <Typography color="primary"> Sign up successfull</Typography> : ''}
    </form>
  );
};

export default SignUp;

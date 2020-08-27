import React from "react";
import useSignInForm from "../hooks/CustomHooks";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./../css/signInPage.css";

const SignIn = (props) => {
  let history = useHistory();

  const signIn = () => {
    const formSubmitURL = process.env.REACT_APP_HTTP_API_URL + "/login";
    fetch(formSubmitURL, {
      method: "POST",
      body: JSON.stringify({
        userName: inputs.userName,
        password: inputs.password,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.isAuthenticated) {
          sessionStorage.setItem("userId", data.userIdentifier);
          sessionStorage.setItem("userData", JSON.stringify(data.userData));
          history.push("/dashboard");
        }
      });
  };

  const { inputs, handleInputChange, handleSubmit } = useSignInForm(
    { userName: "", password: "" },
    signIn
  );

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-element">
        <TextField
          type="text"
          name="userName"
          label="Username"
          onChange={handleInputChange}
          value={inputs.userName}
        />
      </div>
      <div className="form-element">
        <TextField
          type="password"
          name="password"
          label="Password"
          onChange={handleInputChange}
          value={inputs.password}
        />
      </div>
      <div className="form-element">
        <Button variant="contained" color="primary" type="submit">
          Sign In
        </Button>
      </div>
    </form>
  );
};

export default SignIn;

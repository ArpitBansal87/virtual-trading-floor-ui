import React from 'react';
import useSignInForm from '../hooks/CustomHooks';
import { useHistory } from "react-router-dom";

const SignIn = (props) => {

    let history = useHistory();

    const signIn = () => {
        const formSubmitURL = process.env.REACT_APP_HTTP_API_URL + '/login';
        fetch(formSubmitURL, {
            method: 'POST',
            body: JSON.stringify({
              userName: inputs.userName,
              password: inputs.password  
            })
        })
        .then((response) => {
            return response.json();
        })
        .then(data => {
            if(data.isAuthenticated){
              sessionStorage.setItem('userId', data.userIdentifier)
              history.push('/dashboard');
            }
        })
    }
    
    const {inputs, handleInputChange, handleSubmit} = useSignInForm({userName: '', password: ''}, signIn);
    
    return (
        <form onSubmit={handleSubmit}>
          <div className="signIn">
            <label>User Name</label>
            <input type="text" name="userName" required onChange={handleInputChange} value={inputs.userName}/>
          </div>
          <div>
            <label>Password</label>
            <input type="password" name="password" onChange={handleInputChange} value={inputs.password}/>
          </div>
          <button type="submit">Sign In</button>
        </form>
      )
}

export default SignIn;

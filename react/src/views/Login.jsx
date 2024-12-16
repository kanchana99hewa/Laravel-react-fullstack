import {Link} from "react-router-dom";
import axiosClient from "../axios-client.js";
import {createRef} from "react";
import {useStateContext} from "../context/ContextProvider.jsx";
import { useState } from "react";

export default function Login() {
  const emailRef = createRef();  // Create a reference for the email input field
  const passwordRef = createRef();  // Create a reference for the password input field
  const { setUser, setToken } = useStateContext();  // Destructure to get setUser and setToken functions from context
  const [message, setMessage] = useState(null);  // Manage local state for error message

  // Handle form submission
  const onSubmit = ev => {
    ev.preventDefault();  // Prevent the default form submission behavior

    // Prepare the payload with email and password from form inputs
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    // Make POST request to the login API
    axiosClient.post('/login', payload)
      .then(({ data }) => {
        // On success, set the user and token in context
        setUser(data.user);
        setToken(data.token);
      })
      .catch((err) => {
        // Handle errors, particularly validation errors with status 422
        const response = err.response;
        if (response && response.status === 422) {
          setMessage(response.data.message);  // Set error message from response
        }
      });
  };

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Login into your account</h1>

          {/* Display error message if there's one */}
          {message && 
            <div className="alert">
              <p>{message}</p>  {/* Display the error message */}
            </div>
          }

          {/* Input fields for email and password */}
          <input ref={emailRef} type="email" placeholder="Email" />
          <input ref={passwordRef} type="password" placeholder="Password" />

          {/* Submit button */}
          <button className="btn btn-block">Login</button>

          {/* Link to signup page if the user doesn't have an account */}
          <p className="message">Not registered? <Link to="/signup">Create an account</Link></p>
        </form>
      </div>
    </div>
  );
}
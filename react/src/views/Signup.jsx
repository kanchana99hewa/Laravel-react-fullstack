
import { Link } from "react-router-dom"; // For navigation between routes
import { createRef, useState } from "react"; // createRef for form references, useState for managing state
import axiosClient from "../axios-client.js"; // Axios instance for API requests
import { useStateContext } from "../context/ContextProvider.jsx"; // Custom context for global state management

// Signup Component
export default function Signup() {
  // Create references for input fields
  const nameRef = createRef();
  const emailRef = createRef();
  const passwordRef = createRef();
  const passwordConfirmationRef = createRef();

  // Destructure setUser and setToken from context to update global user/token state
  const { setUser, setToken } = useStateContext();

  // State for handling errors
  const [errors, setErrors] = useState(null);

  // Form submission handler
  const onSubmit = (ev) => {
    ev.preventDefault(); // Prevent default form submission behavior

    // Create a payload object containing form data
    const payload = {
      name: nameRef.current.value, // Get value from name input field
      email: emailRef.current.value, // Get value from email input field
      password: passwordRef.current.value, // Get value from password input field
      password_confirmation: passwordConfirmationRef.current.value, // Confirm password field
    };

    // Make a POST request to the /signup endpoint with the payload
    axiosClient
      .post("/signup", payload)
      .then(({ data }) => {
        // On successful signup, update the user and token in global state
        setUser(data.user);
        setToken(data.token);
      })
      .catch((err) => {
        // Handle errors (e.g., validation errors or API issues)
        const response = err.response;
        if (response && response.status === 422) {
          // Set validation errors received from the backend
          setErrors(response.data.errors);
        }
      });
  };

  // JSX to render the signup form
  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Signup for Free</h1>

          {/* Display validation errors if any */}
          {errors && (
            <div className="alert">
              {Object.keys(errors).map((key) => (
                <p key={key}>{errors[key][0]}</p> // Display first error message for each field
              ))}
            </div>
          )}

          {/* Input fields for name, email, password, and password confirmation */}
          <input ref={nameRef} type="text" placeholder="Full Name" />
          <input ref={emailRef} type="email" placeholder="Email Address" />
          <input ref={passwordRef} type="password" placeholder="Password" />
          <input
            ref={passwordConfirmationRef}
            type="password"
            placeholder="Repeat Password"
          />

          {/* Signup button */}
          <button className="btn btn-block">Signup</button>

          {/* Navigation link for existing users */}
          <p className="message">
            Already registered? <Link to="/login">Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

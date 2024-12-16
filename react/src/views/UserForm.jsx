import { useNavigate, useParams } from "react-router-dom";  // Import hooks for navigation and accessing route params
import { useEffect, useState } from "react";  // Import hooks for managing component state and side effects
import axiosClient from "../axios-client.js";  // Import axios client for making HTTP requests
import { useStateContext } from "../context/ContextProvider.jsx";  // Import context for accessing global state

export default function UserForm() {
  const navigate = useNavigate();  // Hook for navigating to different routes
  let { id } = useParams();  // Access the "id" parameter from the URL (used for updating an existing user)
  
  // State for managing the user form data (initialize with default values)
  const [user, setUser] = useState({
    id: null,
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });
  
  // State for managing errors
  const [errors, setErrors] = useState(null);
  
  // State for managing loading status
  const [loading, setLoading] = useState(false);
  
  // Access the notification setter function from context
  const { setNotification } = useStateContext();

  // Effect hook to fetch user data if the "id" parameter exists (for updating an existing user)
  useEffect(() => {
    if (id) {
      setLoading(true);  // Set loading to true while fetching user data
      axiosClient.get(`/users/${id}`)  // Fetch user data from API
        .then(({ data }) => {
          setLoading(false);  // Set loading to false once the data is fetched
          setUser(data);  // Set the fetched user data to the state
        })
        .catch(() => {
          setLoading(false);  // Set loading to false if there is an error
        });
    }
  }, [id]);  // Effect runs again if the "id" changes

  // Handle form submission (for creating or updating user)
  const onSubmit = ev => {
    ev.preventDefault();  // Prevent the default form submission behavior

    if (user.id) {  // If the user has an "id", perform an update
      axiosClient.put(`/users/${user.id}`, user)  // Send a PUT request to update the user
        .then(() => {
          setNotification('User was successfully updated');  // Show success notification
          navigate('/users');  // Redirect to the list of users after successful update
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);  // Set validation errors to the state
          }
        });
    } else {  // If the user doesn't have an "id", perform a create action
      axiosClient.post('/users', user)  // Send a POST request to create a new user
        .then(() => {
          setNotification('User was successfully created');  // Show success notification
          navigate('/users');  // Redirect to the list of users after successful creation
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);  // Set validation errors to the state
          }
        });
    }
  };

  return (
    <>
      {/* Display heading based on whether the user is being created or updated */}
      {user.id && <h1>Update User: {user.name}</h1>}
      {!user.id && <h1>New User</h1>}
      
      {/* User form card */}
      <div className="card animated fadeInDown">
        {/* Show loading message while data is being fetched */}
        {loading && (
          <div className="text-center">
            Loading...
          </div>
        )}

        {/* Display errors if any */}
        {errors && 
          <div className="alert">
            {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]}</p>  // Loop through each error and display it
            ))}
          </div>
        }

        {/* Form to create or update user */}
        {!loading && (
          <form onSubmit={onSubmit}>
            <input 
              value={user.name} 
              onChange={ev => setUser({ ...user, name: ev.target.value })} 
              placeholder="Name"
            />
            <input 
              value={user.email} 
              onChange={ev => setUser({ ...user, email: ev.target.value })} 
              placeholder="Email"
            />
            <input 
              type="password" 
              onChange={ev => setUser({ ...user, password: ev.target.value })} 
              placeholder="Password"
            />
            <input 
              type="password" 
              onChange={ev => setUser({ ...user, password_confirmation: ev.target.value })} 
              placeholder="Password Confirmation"
            />
            <button className="btn">Save</button>
          </form>
        )}
      </div>
    </>
  );
}

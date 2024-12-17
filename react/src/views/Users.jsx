import {useEffect, useState} from "react"; 
import axiosClient from "../axios-client.js";  // Importing the axios client for making HTTP requests
import {Link} from "react-router-dom";  // Importing Link component from React Router for navigation
import {useStateContext} from "../context/ContextProvider.jsx";  // Importing the context provider to access global state

export default function Users() {
  // State variables for storing users list, loading state, and notification message
  const [users, setUsers] = useState([]);  
  const [loading, setLoading] = useState(false);  
  const {setNotification} = useStateContext();  // Extracting the notification setter from the context

  useEffect(() => {
    getUsers();  // Fetch the users when the component is mounted
  }, [])  // Empty dependency array ensures it runs once when the component is first rendered

  // Function to handle user deletion
  const onDeleteClick = user => {
    // Confirm deletion before proceeding
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;  // If canceled, do nothing
    }
    // Sending a DELETE request to the server to remove the user
    axiosClient.delete(`/users/${user.id}`)
      .then(() => {
        setNotification('User was successfully deleted');  // Set notification after successful deletion
        getUsers();  // Refresh the users list after deletion
      })
  }

  // Function to fetch the list of users from the API
  const getUsers = () => {
    setLoading(true);  // Set loading state to true while fetching data
    axiosClient.get('/users')  // Sending GET request to fetch users data
      .then(({ data }) => {
        setLoading(false);  // Set loading state to false after receiving data
        setUsers(data.data);  // Store the fetched users data in state
      })
      .catch(() => {
        setLoading(false);  // Set loading state to false in case of an error
      })
  }

  return (
    <div>
      {/* Users page header and link to add a new user */}
      <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
        <h1>Users</h1>
        <Link className="btn-add" to="/users/new">Add new</Link>  {/* Link to navigate to the user creation page */}
      </div>

      {/* Card container for displaying the users list */}
      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>ID</th>  {/* Column header for user ID */}
              <th>Name</th>  {/* Column header for user name */}
              <th>Email</th>  {/* Column header for user email */}
              <th>Create Date</th>  {/* Column header for the user creation date */}
              <th>Actions</th>  {/* Column header for the actions (edit and delete buttons) */}
            </tr>
          </thead>

          {/* Display a loading message if data is being fetched */}
          {loading &&
            <tbody>
              <tr>
                <td colSpan="5" className="text-center">
                  Loading...  {/* Loading indicator while users are being fetched */}
                </td>
              </tr>
            </tbody>
          }

          {/* Display the users list if loading is complete */}
          {!loading &&
            <tbody>
              {users.map(u => (  // Map over the users array and display each user in a table row
                <tr key={u.id}>
                  <td>{u.id}</td>  {/* Display user ID */}
                  <td>{u.name}</td>  {/* Display user name */}
                  <td>{u.email}</td>  {/* Display user email */}
                  <td>{u.created_at}</td>  {/* Display user creation date */}
                  <td>
                    {/* Link to edit the user */}
                    <Link className="btn-edit" to={'/users/' + u.id}>Edit</Link>
                    &nbsp;  {/* Add a small space */}
                    {/* Button to delete the user */}
                    <button className="btn-delete" onClick={() => onDeleteClick(u)}>Delete</button> {/* Fixed the issue by removing the unused 'ev' */}
                  </td>
                </tr>
              ))}
            </tbody>
          }
        </table>
      </div>
    </div>
  )
}

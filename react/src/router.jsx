import {createBrowserRouter, Navigate} from "react-router-dom";  // Importing necessary components from React Router
import Dashboard from "./Dashboard.jsx";  // Importing the Dashboard component
import DefaultLayout from "./components/DefaultLayout";  // Importing DefaultLayout component for authenticated users
import GuestLayout from "./components/GuestLayout";  // Importing GuestLayout component for unauthenticated users
import Login from "./views/Login";  // Importing Login view component
import NotFound from "./views/NotFound";  // Importing NotFound view (404 page)
import Signup from "./views/Signup";  // Importing Signup view component
import Users from "./views/Users";  // Importing Users view component (for viewing users list)
import UserForm from "./views/UserForm";  // Importing UserForm view component (for creating/updating users)

const router = createBrowserRouter([  // Creating a browser router to handle routing within the app
  {
    path: '/',  // Default path for authenticated users
    element: <DefaultLayout/>,  // The layout used for authenticated routes
    children: [
      {
        path: '/',  // Redirecting the root path to /users
        element: <Navigate to="/users"/>  // Automatically navigate to /users
      },
      {
        path: '/dashboard',  // Path for the Dashboard page
        element: <Dashboard/>  // Rendering the Dashboard component
      },
      {
        path: '/users',  // Path for the users list page
        element: <Users/>  // Rendering the Users component
      },
      {
        path: '/users/new',  // Path for creating a new user
        element: <UserForm key="userCreate" />  // Rendering the UserForm component with a unique key for creating a user
      },
      {
        path: '/users/:id',  // Path for editing an existing user
        element: <UserForm key="userUpdate" />  // Rendering the UserForm component with a unique key for updating a user
      }
    ]
  },
  {
    path: '/',  // Default path for unauthenticated (guest) users
    element: <GuestLayout/>,  // The layout used for guest routes
    children: [
      {
        path: '/login',  // Path for the login page
        element: <Login/>  // Rendering the Login component
      },
      {
        path: '/signup',  // Path for the signup page
        element: <Signup/>  // Rendering the Signup component
      }
    ]
  },
  {
    path: "*",  // A wildcard path to catch all non-matching routes
    element: <NotFound/>  // Rendering the NotFound component (404 page) for undefined routes
  }
])

export default router;  // Exporting the configured router to be used in the app

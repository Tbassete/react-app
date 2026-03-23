import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Pages/home';
import ErrorPage from './Pages/ErrorPage';
import Userss from './Pages/userss';
import Logout from './Pages/logout';
import UserDetails from './Pages/UserDetailss';
import NewUser from './Pages/NewUser';
import Login from './Pages/login';
import Loading from './Pages/loading';


const publicRoute = createBrowserRouter([{
  path: '/', 
  element: <App />,
  children: [
    {path: '/', element: <Home />},
    {path: '/home', element: <Home />},
    {path: '/login', element: <Login />},
    {path: '/*', element: <ErrorPage />},
    {path: '/loading', element: <Loading />},
  ]
  }])

  const protectedRoute = createBrowserRouter([{
  path: '/', 
  element: <App />,
  children: [
    {path: '/', element: <Userss />},
    {path: '/users', element: <Userss />},
    {path: '/users/:id', element: <UserDetails />},
    {path: '/newuser', element: <NewUser />},
    {path: '/logout', element: <Logout />},
    {path: '/*', element: <ErrorPage />},
  ]
  }])


  const route = localStorage.getItem("@1app/displayname") === null ? publicRoute : protectedRoute

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={route} />
  </React.StrictMode>
);






// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals


import { createBrowserRouter, RouterProvider } from "react-router";

import React from "react";
import RootLayout from "./components/RootLayout";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import UserProfile from "./components/UserProfile";
import AuthorProfile from "./components/AuthorProfile";
import AdminProfile from "./components/AdminProfile";
import Articles from "./components/Articles";

const App = () => {
  const routerObj = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
            path:"/userProfile",
            element:<UserProfile/>
        },
        {
            path:"/authorProfile",
            element:<AuthorProfile/>
        },
        {
            path:"/adminProfile",
            element:<AdminProfile/>
        },
        {
            path:"/article",
            element:<Articles/>
        },
        
      ],
    },
  ]);
  return <div>
    <RouterProvider router={routerObj}/>
  </div>;
};

export default App;

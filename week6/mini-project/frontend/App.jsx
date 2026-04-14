// import { createBrowserRouter, RouterProvider } from "react-router";
// import RootLayout from "./src/components/RootLayout";
// import Home from "./src/components/Home";
// import CreateEmp from "./src/components/CreateEmp";
// import ListOfEmp from "./src/components/ListOfEmp";

// function App() {
//   const routerObj = createBrowserRouter([
//     {
//       path: "/",
//       element: <RootLayout />,
//       children: [
//         { path: "", element: <Home /> },
//         { path: "create-emp", element: <CreateEmp /> },
//         { path: "list", element: <ListOfEmp /> },
//       ],
//     },
//   ]);

//   return <RouterProvider router={routerObj} />;
// }

// export default App;

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./src/components/RootLayout";
import Home from "./src/components/Home";
import CreateEmp from "./src/components/CreateEmp";
import ListOfEmp from "./src/components/ListOfEmp";
import Employee from "./src/components/Employee";
import EditEmployee from "./src/components/EditEmployee";

function App() {
  const routerObj = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { path: "", element: <Home /> },
        { path: "create-emp", element: <CreateEmp /> },
        { path: "list", element: <ListOfEmp /> },
        { path: "employee", element: <Employee /> },
        { path: "edit-emp", element: <EditEmployee /> },
      ],
    },
  ]);

  return <RouterProvider router={routerObj} />;
}

export default App;

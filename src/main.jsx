// import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MediaDetail from "./pages/MediaDetail";
import RootLayout from "./pages/RootLayout";
import MediaCardSkeleton from "./components/MediaList/MediaCardSkeleton";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/movie/:id",
        element: <MediaDetail />,
      },
    ],
  },
  {
    path: "/test",
    element: <MediaCardSkeleton/>
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <RouterProvider router={router} />,
  // </React.StrictMode>,
);

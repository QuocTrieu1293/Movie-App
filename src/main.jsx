// import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "@pages/HomePage";
import MovieDetail from "@pages/MovieDetail";
import RootLayout from "@pages/RootLayout";
import MediaCardSkeleton from "@components/MediaList/MediaCardSkeleton";
import AppProvider from "@context/AppProvider";
import TVShowDetail from "@pages/TVShowDetail";

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
        element: <MovieDetail />,
      },
      {
        path: "/tv/:id",
        element: <TVShowDetail />,
      },
    ],
  },
  {
    path: "/test",
    element: <MediaCardSkeleton />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <AppProvider>
    <RouterProvider router={router} />
  </AppProvider>,
  // </React.StrictMode>,
);

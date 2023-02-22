import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Link,
} from "react-router-dom";
import Root from "./routes/root";
import Contact from "./routes/contact";
import ErrorPage from "./error-page";

import "./index.css";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "contacts/:contactId",
        element: <Contact />,
      },
    ],
    errorElement: <ErrorPage />
  },

]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
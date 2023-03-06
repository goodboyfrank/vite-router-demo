import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Link,
} from "react-router-dom";
import Root, { loader as rootLoader, action as rootAction, } from "./routes/root";
import Contact, { loader as contactLoader, } from "./routes/contact";
import ErrorPage from "./error-page";
import EditContact, { action as editAction, } from "./routes/edit";
import { action as destroyAction } from "./routes/destroy";
import Index from "./routes/index";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

import "./index.css";
Sentry.init({
  dsn: "https://56bab162d2ec4cd7a0eeb837c681e545@o4504762400571392.ingest.sentry.io/4504773280595968",
  integrations: [new BrowserTracing()],

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  release: '1.0.0',
  tracesSampleRate: 1.0,
});
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: rootLoader,
    action: rootAction,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Index /> },
          {
            path: "contacts/:contactId",
            element: <Contact />,
            loader: contactLoader
          },
          {
            path: "contacts/:contactId/edit",
            element: <EditContact />,
            loader: contactLoader,
            action: editAction,
          },
          {
            path: "contacts/:contactId/destroy",
            action: destroyAction,
            errorElement: <div>Oops! There was an error.</div>,
          }
        ]
      }
    ],
  },

]);

createRoot(document.getElementById("root")).render(
  <Sentry.ErrorBoundary fallback={<>这是一个错误页面的fallback</>}>
    <RouterProvider router={router} />
  </Sentry.ErrorBoundary>
);
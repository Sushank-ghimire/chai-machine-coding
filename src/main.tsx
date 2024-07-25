import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { DataTable, DragAndDrop, Verification } from "./pages/Export.tsx";
import { Layout } from "./components/Export.tsx";
import { DragDropContext } from 'react-beautiful-dnd';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/otp-form",
    element: (
      <Layout>
        <Verification />
      </Layout>
    ),
  },
  {
    path: "/batches",
    element: (
      <Layout>
        <DataTable />
      </Layout>
    ),
  },
  {
    path: "/course-list",
    element: (
      <Layout>
          <DragAndDrop />
      </Layout>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

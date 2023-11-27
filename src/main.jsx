// Importation des composants
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { store } from "./app/store";
import { Provider } from "react-redux";

// Importation des pages
import HomePage from "./pages/HomePage.jsx";
import SubPage from "./pages/SubPage.jsx";

// Importation du Css Global
import "./index.css";

// Importation des features
import { fetchCategories } from "./features/CategoriesSlice";

// Execution des features
store.dispatch(fetchCategories());

// Route de l'application
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    children: [
      {
        path: ":catName/:catId/:subName/:subId",
        element: <SubPage />,
      },
    ],
  },
  {
    path: `/*`,
    element: <HomePage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

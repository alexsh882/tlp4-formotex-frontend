import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "./features/auth/context/provider";
import MainLayout from "./layouts/main-layout";
import NotFoundPage from "./pages/not-found";
import LoginPage from "./pages/auth/login";
import Home from "./pages/home";

import "./index.css";
import InventoryEntriesPage from "./pages/inventory-entries";
import { ThemeProvider } from "./features/ui/theme/context/provider";
import EquipmentTypesPage from "./pages/equipment-types";
import MakesPage from "./pages/makes";
import EquipmentsPage from "./pages/equipments";
import InventoriesPage from "./pages/inventories";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", index: true, element: <Home /> },
      { path: "/inventory", element: <InventoriesPage /> },
      { path: "/inventory-entries", element: <InventoryEntriesPage /> },
      { path: "/equipments", element: <EquipmentsPage /> },
      { path: "/equipment-types", element: <EquipmentTypesPage /> },
      { path: "/makes", element: <MakesPage /> },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider storageKey="vite-ui-theme">
          <RouterProvider router={router}></RouterProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);

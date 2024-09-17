import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "./features/auth/context/provider";
import MainLayout from "./layouts/main-layout";
import NotFoundPage from "./pages/not-found";
import LoginPage from "./pages/auth/login";
import Home from "./pages/home";

import InventoryEntriesPage from "./pages/inventory-entries";
import { ThemeProvider } from "./features/ui/theme/context/provider";
import EquipmentTypesPage from "./pages/equipment-types";
import MakesPage from "./pages/makes";
import EquipmentsPage from "./pages/equipments";
import InventoriesPage from "./pages/inventories";
import UsersPage from "./pages/users";
import InventoryEntryCreate from "./pages/inventory-entries/create";

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
      { path: "/equipments", element: <EquipmentsPage /> },
      { path: "/equipment-types", element: <EquipmentTypesPage /> },
      { path: "/makes", element: <MakesPage /> },
      { path: "/users", element: <UsersPage /> },
      { path: "/inventory-entries", element: <InventoryEntriesPage /> },      
      { path: "/inventory-entries/create", element: <InventoryEntryCreate /> },      
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider storageKey="vite-ui-theme">
          <RouterProvider router={router}></RouterProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

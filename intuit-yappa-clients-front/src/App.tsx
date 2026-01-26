import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import ClientsManagement from "./pages/ClientsManagement/ClientsManagement";
import ClientDetail from "./pages/ClientDetail/ClientDetail";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <MainLayout>
          <ClientsManagement />
        </MainLayout>
      ),
    },
    {
      path: "/clients/:id",
      element: (
        <MainLayout>
          <ClientDetail />
        </MainLayout>
      ),
    },
    {
      path: "*",
      element: (
        <MainLayout>
          <ClientsManagement />
        </MainLayout>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;

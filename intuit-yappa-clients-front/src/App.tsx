import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import ClientsManagement from "./pages/ClientsManagement/ClientsManagement";

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
      path: "/login",
      element: <>eeeeeeeeeeeeeeee</>,
    },
    {
      path: "book/:id",
      element: <></>,
    },
    {
      path: "*",
      element: <>DEFAULT</>,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;

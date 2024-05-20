import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { useAuth } from "./hooks";
import { Home, SignIn } from "./pages";
import { FullScreenLoader } from "./components/FullScreenLoader";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProductsPage } from "./pages/ProductsPage";
import { WantedPlatesPage } from "./pages/WantedPlatesPage";

export const Router = () => {
  const { isAuthenticated, isLoadingAuth } = useAuth();
  const router = createBrowserRouter(
    [
      {
        path: "/sign-in",
        element: isAuthenticated ? <Navigate to="/" /> : <SignIn />,
      },
      {
        path: "/",
        element: !isAuthenticated ? <Navigate to="/sign-in" /> : <Home />,
      },
      {
        path: "/products",
        element: !isAuthenticated ? (
          <Navigate to="/sign-in" />
        ) : (
          <ProductsPage />
        ),
      },
      {
        path: "/wanted-plates",
        element: !isAuthenticated ? (
          <Navigate to="/sign-in" />
        ) : (
          <WantedPlatesPage />
        ),
      },
    ],
    { basename: "/chirra-admin-frontend" }
  );
  return (
    <>
      {isLoadingAuth ? (
        <FullScreenLoader />
      ) : (
        <RouterProvider router={router} />
      )}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
};

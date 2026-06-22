import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import { EditorPage } from "./pages/Editor/EditorPage";
import { AboutPage } from "./pages/About/AboutPage";
import { VerifyPage } from "./pages/Verify/VerifyPage";
import { AuthPage } from "./pages/Auth/AuthPage";
import { ProtectedRoute } from "./utils/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthPage />,
  },

  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <EditorPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "editor/:id",
        element: (
          <ProtectedRoute>
            <EditorPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "document/:id",
        element: (
          <ProtectedRoute>
            <EditorPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "about",
        element: (
          <ProtectedRoute>
            <AboutPage />
          </ProtectedRoute>
        ),
      },
    ],
  },

  {
    path: "verify/:hash",
    element: <VerifyPage />,
  },
]);

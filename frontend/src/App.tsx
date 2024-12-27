import { Navigate, Outlet, useRoutes } from "react-router-dom"
import { useWebStore } from "./store/authStore"
import Register from "./routes/Register"
import Login from "./routes/Login"
import NotFound from "./routes/NotFound"
import Dashboard from "./routes/Dashboard"
import Profile from "./routes/Profile"



export default function App () {
  const isAuthenticated = useWebStore((state) => state.token !== null)
  const protectedRoute = isAuthenticated ? <Outlet /> : <Navigate to="/login" replace/>
  const publicRoute = !isAuthenticated ? <Outlet /> : <Navigate to="/" replace/>

  const routes = [
    {
      path: "/",
      element: publicRoute,
      children: [
        { path: 'register', element: <Register /> },
        { path: 'login', element: <Login /> },
      ]
    },
    {
      path: "/",
      element: protectedRoute,
        children: [
          { index: true, element: <Dashboard /> },
          { path: 'profile', element: <Profile /> },
      ]
    },
    {
      path: "*",
      element: <NotFound />
    }
  ]
  const routing = useRoutes(routes);
  return <>{routing}</>;
}
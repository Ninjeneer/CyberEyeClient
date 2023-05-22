import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "./contexts/Auth"

export const PrivateRoute = () => {
    const auth = useAuth()

    if (!auth?.session?.user) {
        return <Navigate to="/auth" />
    }

    return <Outlet />
}
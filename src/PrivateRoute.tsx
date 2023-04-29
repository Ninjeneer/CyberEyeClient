import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "./contexts/Auth"

export const PrivateRoute = () => {
    const session = useAuth()

    if (!session?.user) {
        return <Navigate to="/login" />
    }

    if (!session?.user?.settings?.plan) {
        return <Navigate to="/select-plan" />
    }

    return <Outlet />
}
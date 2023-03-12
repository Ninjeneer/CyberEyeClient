import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "./contexts/Auth"

export const PrivateRoute = () => {
    const user= useAuth()

    return  user ? <Outlet /> : <Navigate to="/login" />
}
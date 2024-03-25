import { Navigate, Outlet } from "react-router-dom"

export const PrivateRoutes = ({ user }) => {
    return (
        user !== null ? <Outlet /> : <Navigate to="/" />
    )
}
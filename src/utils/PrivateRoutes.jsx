import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { UserContext } from "@/context/userContext"

export const PrivateRoutes = () => {
    const { user } = useContext(UserContext)

    return (
        user !== null ? <Outlet /> : <Navigate to="/" />
    )
}
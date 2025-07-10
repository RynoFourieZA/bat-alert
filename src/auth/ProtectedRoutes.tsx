import { Outlet, Navigate } from "react-router";
import { useAppSelector } from "../app/hooks";

const ProtectedRoutes = () => {
    const status = useAppSelector(state => state.auth.status);
    return status === "success" ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoutes;
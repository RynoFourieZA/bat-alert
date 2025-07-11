import { Outlet, Navigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setStatus, setToken, type StatusType, type TokenType } from "../features/authSlice";

const ProtectedRoutes = () => {
  const dispatch = useAppDispatch();

  let status = useAppSelector((state) => state.auth.status);
  let token = useAppSelector((state) => state.auth.token);

  const storedStatus = sessionStorage.getItem("status");
  const storedToken = sessionStorage.getItem("token");

  let getSessionStatus: StatusType;
  let getSessionToken: TokenType;

  if (storedStatus !== null && storedToken !== null) {
    getSessionStatus = { status: storedStatus };
    getSessionToken = { token: storedToken };
    dispatch(setStatus(getSessionStatus));
    dispatch(setToken(getSessionToken));
  } else {
    getSessionStatus = { status: "" }; 
  }

  return status === "success" || storedStatus === "success" && token !== "" ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoutes;

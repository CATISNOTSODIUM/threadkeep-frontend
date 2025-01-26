import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentjwtToken } from "../../feature/auth/authSlice.ts";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function RequireAuth() {
    const token = useSelector(selectCurrentjwtToken);
    const location = useLocation();
    return (
        (token) 
        ? <Outlet/>
        : <Navigate to="/signin" state={{from: location}} replace/>
    )
}
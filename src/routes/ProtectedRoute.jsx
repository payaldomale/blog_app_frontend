import { Navigate } from "react-router-dom";
import { useAuth } from "../store/authStore";

export default function ProtectedRoute({ children }) {
    const loggedIn = useAuth((state) => state.loggedIn);

    if (!loggedIn) {
        return <Navigate to="/login" replace />;
    }

    return children;
}
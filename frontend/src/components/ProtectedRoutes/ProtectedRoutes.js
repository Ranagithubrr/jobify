import { useEffect } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
    // const navigate = useNavigate()

        const user = JSON.parse(localStorage.getItem('userid'));
        console.log(`user id is ${user}`);
        if (!user) {
            return <Navigate to="/landing" replace />;
        }
        return children

}

export default ProtectedRoutes

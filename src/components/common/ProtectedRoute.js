// import { useContext } from "react";
import { Navigate, Outlet } from 'react-router-dom';
// import { UserContext } from "../../contexts/UserContext";
import { getCurrentUser } from "../../services/userService";


const PrivateRoute = ({children}) => {
    // const user = useContext(UserContext);
    const user = getCurrentUser();
    
    if (!user) {
        return <Navigate to="/notFound" replace />
    }

    return children ? children : <Outlet />  
};

export default PrivateRoute;

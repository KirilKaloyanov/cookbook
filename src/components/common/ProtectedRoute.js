import { Navigate, Outlet } from 'react-router-dom';
import { getCurrentUser } from "../../services/userService";


const PrivateRoute = ({children}) => {
    const user = getCurrentUser();
    
    if (!user) {
        return <Navigate to="/notFound" replace />
    }

    return children ? children : <Outlet />  
};

export default PrivateRoute;

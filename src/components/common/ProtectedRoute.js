import { useContext } from "react";
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from "../../contexts/UserContext";


const PrivateRoute = ({children}) => {
    const user = useContext(UserContext);
    
    if (!user) {
        return <Navigate to="/notFound" />
    }

    return children ? children : <Outlet />  
};

export default PrivateRoute;

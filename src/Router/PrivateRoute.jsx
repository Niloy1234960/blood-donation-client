import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { Navigate } from 'react-router';

const PrivateRoute = ({children}) => {
    
    const {user, loading, roleLoading, userStatus} = useContext(AuthContext)
    
    if(loading || roleLoading){
        return <p>loading........</p>
    }

    if(!user || !userStatus == 'active' ){
        return <Navigate to='/login'></Navigate>
    }
    
    return children;
};

export default PrivateRoute;
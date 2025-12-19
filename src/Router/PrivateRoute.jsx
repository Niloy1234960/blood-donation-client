import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { Navigate } from 'react-router';
import Loading from '../Page/Loading/Loading';

const PrivateRoute = ({children}) => {
    
    const {user, loading, roleLoading, userStatus} = useContext(AuthContext)
    
    if(loading || roleLoading){
        return <Loading></Loading>
    }

    if(!user || !userStatus == 'active' ){
        return <Navigate to='/login'></Navigate>
    }
    
    return children;
};

export default PrivateRoute;
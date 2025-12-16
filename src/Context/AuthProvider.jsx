import React, { useEffect, useState } from 'react';
import { signInWithPopup,onAuthStateChanged, GoogleAuthProvider, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { AuthContext } from './AuthContext';
import { auth } from '../Firebase/Firebase.config';
import axios from 'axios';

const provider =new GoogleAuthProvider()

const AuthProvider = ({children}) => {
    
    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true);
    const [role, setRole] = useState('')
    const [roleLoading, setRoleLoading] = useState(true)
    const [userStatus, setUserStatus] = useState('')
    

//    Google Login 
    const googleLogin =()=>{
        return signInWithPopup(auth,provider)
    }

// log out

    const LogOut =()=>{
        return signOut(auth)
    }
// creat user
    const Creatuser =(email,password)=>{
        return createUserWithEmailAndPassword(auth,email,password)
    }

// Login user 
const Login =(email,password)=>{
    return signInWithEmailAndPassword(auth,email,password)
}

    useEffect(()=>{
        const unsubscrib = onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser);
            setLoading(false);
        });
        return ()=>{
            unsubscrib()
        }},[])

        useEffect(()=>{
            axios.get(`http://localhost:5000/users/role/${user?.email}`)
            .then(res=> {
                setRole(res.data.role)
                setUserStatus(res.data.status)
                setRoleLoading(false)
            })
        }, [user])

      

    const authData ={
        user,
        setUser,
        loading,
        googleLogin,
        LogOut,
        Creatuser,
        Login,
        roleLoading,
        role,
        userStatus,
    }

    return <AuthContext value={authData}>{children}</AuthContext>
};

export default AuthProvider;
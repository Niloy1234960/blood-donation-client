import axios from "axios"
import {  useContext, useEffect } from "react"
import { AuthContext } from "../Context/AuthContext"

const AxiosSecure = axios.create({
    baseURL :'http://localhost:5000/'
})

const useAxiosSecure = () => {

    const {user} = useContext(AuthContext);

    useEffect(()=> {

            const reqInterceptor = AxiosSecure.interceptors.request.use(config =>{
            config.headers.Authorization = `Bearer ${user?.accessToken}`
            return config;
            })

            const resInterceptor = AxiosSecure.interceptors.response.use((response)=>{
                return response
            }, (error)=>{
                console.log(error)
                return Promise.reject(error)
            })

            return () =>{
               AxiosSecure.interceptors.request.eject(reqInterceptor)
               AxiosSecure.interceptors.response.eject(resInterceptor)
            }
    }, [user])

    return AxiosSecure
} 

export default useAxiosSecure
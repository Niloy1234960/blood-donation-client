import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Page/Home/Home";
import AboutUs from "../Page/About/AboutUs";
import Login from "../Page/Login/Login";
import Register from "../Page/Register/Register";
import DashboardLayout from "../Layout/DashboardLayout";
import MainDashboard from "../Page/Dashboard/MainDashboard/MainDashboard";
import Addproduct from "../Page/Dashboard/AddProduct/Addproduct";
import ManageProduct from "../Page/Dashboard/MyRequest/MyRequest";
import AddRequest from "../Page/Dashboard/AddRequest/AddRequest";
import ProfileInput from "../Page/Dashboard/User/ProfileInput";
import AllUsers from "../Page/Dashboard/AllUsers/AllUsers";
import PrivateRoute from "./PrivateRoute";
import Funding from "../Page/Funding/Funding";
import SearchDonor from "../Page/Search/SearchDonor";
import DonationDetails from "../Page/DonationDetails/DonationDetails";

import AllRequest from "../Page/AllRequest/AllRequest";
import MyRequest from "../Page/Dashboard/MyRequest/MyRequest";



export const router = createBrowserRouter([
  {
    path: "/",
    Component:RootLayout,
    children:[
        {
            index:true,
            path:"/",
            Component:Home
        },
        {
            path:"/request",
            Component:AboutUs
        },
        {
            path:"/funding",
            Component: Funding
        },
        {
            path:"/login",
            Component: Login
        },
        {
            path:"/register",
            Component: Register         
        },
        {
            path: "/search",
            Component: SearchDonor
        },
        {
            path: "/donation-details/:id",
            element: <PrivateRoute>
                         <DonationDetails>
                         </DonationDetails>
                     </PrivateRoute>
        }
    ]
  },
  {
    path:"/Dashboard",
    element: <PrivateRoute> 
                   <DashboardLayout></DashboardLayout> 
             </PrivateRoute>,
    children:[
        {
            path:"Main",
            Component: MainDashboard
        },
        {
            path:"AddRequest",
            Component: AddRequest
        },
        {
            path:"myRequest",
            Component: MyRequest
        },
        {
            path:"allRequest",
            Component: AllRequest
        },
        {
            path: "Users",
            Component:ProfileInput
        },
        {
            path: "allUsers",
            Component: AllUsers
        }
        
    ]
  }
]);

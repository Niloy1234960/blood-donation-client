
import { useContext } from "react";
import AdminHomePage from "./AdminHomePage";
import DonorDashboard from "./DonorDashboard";
import { AuthContext } from "../../../Context/AuthContext";
import { Toaster } from "react-hot-toast";

const MainDashboard = () => {

  const {role} = useContext(AuthContext)
  console.log(role)
 

  return (
    <div>
      {
        role == "admin" && <AdminHomePage></AdminHomePage>
      }

      {
        role == "donor" && <DonorDashboard></DonorDashboard>
      }
      
      {
        role == "volunteer" && <AdminHomePage></AdminHomePage>
      }
            <Toaster></Toaster>
      
    </div>
  );
};

export default MainDashboard;


import { useContext } from "react";
import AdminHomePage from "./AdminHomePage";
import DonorDashboard from "./DonorDashboard";
import { AuthContext } from "../../../Context/AuthContext";

const MainDashboard = () => {

  const {role} = useContext(AuthContext)
 

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
      
    </div>
  );
};

export default MainDashboard;



import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let hasShownToast = false; 
let hasShownToasts = false; 


const  PrivateRoute = ({children})=> {
  
  const token = useSelector((state)=>state.auth.token)
  const accountType = useSelector ((state)=>state.user.accountType)
  
    if(token === "null"){
        if(!hasShownToast){
          toast.error('Please login to access the dashboard');
          hasShownToast = true
        }
        return <Navigate to={"/login"}/>
    }
    else{
      
      if(children.type.name === "Dashboard_Instructor"  && accountType !== "Instructor"){
        if(!hasShownToasts){
          toast.error("This route is only for instructor")
          hasShownToasts = true;
        }
        
        return <Navigate to={"/login"}/>
      }
      else{
        if(!hasShownToasts){
          toast.success('Welcome to Dashboard');
          hasShownToasts = true;
        }
        return children;
      }
    }
}

export default PrivateRoute


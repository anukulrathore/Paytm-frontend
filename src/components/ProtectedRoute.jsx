import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userAuth } from "../state";
const ProtectedRoute = ({children}) => {
    const navigate = useNavigate();
    const isLoggedIn = useRecoilValue(userAuth)

    useEffect(() => {
      if(!isLoggedIn){
        return navigate('/signin')
      }
  
    }, [])
    

    
    return (
        <React.Fragment>
            {
                children
            }
        </React.Fragment>
    );
}
export default ProtectedRoute;
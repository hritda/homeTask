import React from "react";
import "./App.css";
import { Outlet, Link, useLocation  } from "react-router-dom";
import { useState, useEffect } from "react";
import OutletContextType from "./types/OutletContextType";
import Message from "./types/Message";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const logout = ()=>{
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const token = JSON.parse(localStorage.getItem("token")!);
    headers.append("Authorization", token);
    const requestOptions = {
      method: "PUT",
      headers: headers,
    };

    fetch(`http://localhost:1000/api/v1/logout`,requestOptions)
    .then((response)=> response.json())
    .then((data :Message) =>{
      localStorage.removeItem('token');
      setIsLoggedIn(false);
    })
    .catch((error)=>{
      console.log(error);
    })

  }
  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token===null){
      setIsLoggedIn(false);

    } else {
      setIsLoggedIn(true);
    }
  }, [])
  
  return (
    <div className="container">
      <div className="row align-items-center my-5">
        <div className="col text-end">
          {!isLoggedIn ? (
            <>
              <Link to="/register">
                <span className="btn btn-primary me-3"> Register </span>
              </Link>{" "}
              {location.pathname !== "/login" ? (
                <Link to="/login">
                  <span className="btn btn-primary "> Login </span>
                </Link>
              ) : (
                ""
              )}
            </>
          ) : (
            <span onClick = {logout} className="btn btn-danger "> Logout </span>
          )}
        </div>
      </div>
      <Outlet
       context={{
       isLoggedIn,setIsLoggedIn
      } as OutletContextType}
      />
    </div>
  );
}

export default App;

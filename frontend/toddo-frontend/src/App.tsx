import React from "react";
import "./App.css";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import OutletContextType from "./types/OutletContextType";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token==null){
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
            <span className="btn btn-danger "> Logout </span>
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

import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import OutletContextType from "../types/OutletContextType";

const Authenticate = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null) {
      navigate("/login");
    } else {
        setIsLoggedIn(true);
    }
  }, []);

  return (
    <>
    { isLoggedIn &&  <Outlet context={
        {
          isLoggedIn,
          setIsLoggedIn,
        } as OutletContextType
      }
    />
}
</>
  );
};

export default Authenticate;

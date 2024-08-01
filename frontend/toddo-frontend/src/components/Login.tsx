import React,{useState} from "react";
import {useOutletContext, useNavigate} from 'react-router-dom';
import OutletContextType from "../types/OutletContextType";
const apiURL = process.env.REACT_APP_API_URL;
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    let payload = {
      email: email,
      password: password,
    }

    let requestOptions = {
      method : "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    }
    fetch(`${apiURL}/api/v1/login`,requestOptions)
    .then((response)=>{
      if(response.ok){
      return response.json();}
      else {
        alert("invalid credentials , please try again");
        return ;
      } ;
  })
    .then((data:any)=>{
      localStorage.setItem('token',JSON.stringify(data.token));
      alert("You have logged in!");
      navigate("/auth");
    })
    .catch((error)=>{
      console.log(error);
    })
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <input
          type="email"
          name="email"
          className="form-control"
          id="email"
          onChange={(event) => { setEmail(event.target.value) }}
          aria-describedby="emailHelp"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          name="password"
          className="form-control"
          id="password"
          onChange={(event) => { setPassword(event.target.value) }}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        login
      </button>
    </form>
  );
};

export default Login;

import React, { ChangeEvent, useState, FormEvent } from "react";
import { User } from "../types/User";
import { useNavigate } from "react-router-dom";
import { UserResp } from "../types/UserResp";

const Register = () => {
    const navigate = useNavigate();
  const [user, setUser] = useState<User>({
    email: "",
    username: "",
    password: "",
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userData = user;

    let requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };

    fetch("http://localhost:1000/api/v1/register", requestOptions)
      .then((resp) => {
        console.log("REPOSNE:", resp)
        if(!resp.ok){
            throw new Error("the user already exists");
        }
        return resp.json();
      })
      .then((data)=>{
        const user: UserResp = data;
        console.log(user.user);
        alert("account has been created! Please login to continue");
        navigate("/login");
      })
      .catch((err)=>{
        alert(err);
      })
  };
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="username" className="form-label">
         Username
        </label>
        <input
          type="text"
          name="username"
          className="form-control"
          id="username"
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <input
          type="email"
          name="email"
          className="form-control"
          id="email"
          onChange={handleChange}
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
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Create account
      </button>
    </form>
  );
};

export default Register;

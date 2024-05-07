import React,{useState} from "react";

import { ITask } from "../types/Tasks";
import { useNavigate , useParams} from "react-router-dom";

const TaskForm = () => {
    let { id } = useParams();
    const navigate = useNavigate();
    const [description, setDescription] = useState<String>("");
    const handleInputChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        const  description  = event.target.value;
        console.log(description)
        setDescription(description);
      };
  const handleSubmit = (event:React.SyntheticEvent<HTMLFormElement>)=>{

    event.preventDefault();
    let payload = {
        description: description,
      };
      
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      const token = JSON.parse(localStorage.getItem("token")!);
      headers.append("Authorization", token);
      const requestOptions = {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(payload),
      };
        fetch(`http://localhost:1000/api/v2/task/${id}`, requestOptions)
        .then( async (response) => await response.json())
        .then((data: ITask) => {
          console.log(data);
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
        });
  }
  return (
    <div className="container">
      <h3>Enter the new task description</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="description">task description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            placeholder="Task description"
            onChange = {handleInputChange}
          />
          <button type="submit" className="my-1 btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
import React,{useState} from "react";
import { IProject } from "../types/Projects";
import { useNavigate , useParams} from "react-router-dom";

const TitleForm = () => {
    let { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState<String>("");
    const handleInputChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        const  title  = event.target.value;
        console.log(title)
        setTitle(title);
      };
  const handleSubmit = (event:React.SyntheticEvent<HTMLFormElement>)=>{

    event.preventDefault();
    let payload = {
        title: title,
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
        fetch(`http://localhost:1000/api/v2/projects/${id}`, requestOptions)
        .then( async (response) => await response.json())
        .then((data: IProject) => {
          console.log(data);
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
        });
  }
  return (
    <div className="container">
      <h3>Enter the new project title</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Project title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="Project title"
            onChange = {handleInputChange}
          />
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default TitleForm;

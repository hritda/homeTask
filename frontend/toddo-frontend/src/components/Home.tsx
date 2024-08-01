import React, { useEffect, useState } from "react";
import { useOutletContext, useNavigate, Link } from "react-router-dom";
import OutletContextType from "../types/OutletContextType";
import Modal from "react-bootstrap/Modal";
import { IProject, IProjectResponse } from "../types/Projects";
import { useForm, SubmitHandler } from "react-hook-form";
import Message from "../types/Message";
const apiURL = process.env.REACT_APP_API_URL;
type Inputs = {
  title: string;
};

const Home = () => {
  const [refetch, setRefetch] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const deleteProject = (projectId: string) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const token = JSON.parse(localStorage.getItem("token")!);
    headers.append("Authorization", token);
    const requestOptions = {
      method: "DELETE",
      headers: headers,
    };
    fetch(`${apiURL}/api/v2/projects/${projectId}`, requestOptions)
      .then((response) => response.json())
      .then((data: Message) => {
        console.log(data.message);
        setRefetch(!refetch);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    let payload = {
      title: data.title,
    };

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const token = JSON.parse(localStorage.getItem("token")!);
    headers.append("Authorization", token);
    const requestOptions = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payload),
    };
    fetch(`${apiURL}/api/v2/projects`, requestOptions)
      .then((response) => response.json())
      .then((data: IProject) => {
        setRefetch(!refetch);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [show, setShow] = useState(false);
  const { isLoggedIn } = useOutletContext<OutletContextType>();
  const [projects, setProjects] = useState<IProject[]>([]);
  const navigate = useNavigate();
  const modalClose = () => setShow(false);
  const modalShow = () => setShow(true);

  useEffect(() => {
    if (isLoggedIn == true) {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      const token = JSON.parse(localStorage.getItem("token")!);
      headers.append("Authorization", token);

      const requestOptions = {
        method: "Get",
        headers: headers,
      };
      fetch(`${apiURL}/api/v2/projects`, requestOptions)
        .then(async (response) => await response.json())
        .then((data: IProjectResponse) => {
          console.log(data.projects);
          if (data.projects) {
            setProjects(data.projects);
          } else {
            setProjects([]);
          }
        })
        .catch((err) => console.log(err));
    } else {
      navigate("/");
    }
  }, [isLoggedIn, refetch, navigate]);
  return (
    <div className="container">
      {isLoggedIn ? (
        <>
          <span className="d-flex justify-content-between my-3">
            <h2>Your project list</h2>
            <button className="btn btn-primary" onClick={modalShow}>
              Create new Project
            </button>
          </span>
          <Modal show={show} onHide={modalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Enter the project title</Modal.Title>
            </Modal.Header>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Modal.Body>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Project Title
                  </label>
                  <input {...register("title", { required: true })} />
                  {errors.title && <span>This field is required</span>}
                </div>
              </Modal.Body>

              <Modal.Footer>
                <button
                  className="btn btn-secondary"
                  type="button"
                  onClick={modalClose}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={modalClose}
                >
                  Save changes
                </button>
              </Modal.Footer>
            </form>
          </Modal>
          <ul className="list-group">
            {projects?.map((project) => {
              return (
                <li
                  key={project._id}
                  className=" d-flex justify-content-around list-group-item"
                >
                  <Link
                    style={{ flex: "0.5" }}
                    to={{ pathname: `/projects/${project._id}` }}
                    state={{ title: project.title }}
                  >
                    <span>{project.title}</span>
                  </Link>
                  <Link to={`/titleForm/${project._id}`}>
                    <button type="button" className="mr-2 btn btn-primary">
                      Edit
                    </button>
                  </Link>
                  <button
                    type="button"
                    onClick={() => project?._id && deleteProject(project._id)}
                    className="mr-2 btn btn-danger"
                  >
                    Delete
                  </button>
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <h2>Please login first to see your project list</h2>
      )}
    </div>
  );
};

export default Home;

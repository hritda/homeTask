import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import { useOutletContext, useParams } from "react-router-dom";
import OutletContextType from "../types/OutletContextType";
import { ITask, ITaskResponse } from "../types/Tasks";
import { useForm, SubmitHandler } from "react-hook-form";
import Message from "../types/Message";
type Inputs = {
  description: string;
};

const TodoList = () => {
  const { isLoggedIn } = useOutletContext<OutletContextType>();
  let { id } = useParams();
  const [list, setList] = useState<ITask[]>([]);
  const [selectedTask, setSelectedTask] = useState<ITask | undefined | null>(
    null
  );
  const [refetch, setRefetch] = useState<boolean>(false);
  const [show, setShow] = useState(false);
  const modalClose = () => setShow(false);
  const modalShow = () => setShow(true);
  const deleteTask = (taskId: string) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const token = JSON.parse(localStorage.getItem("token")!);
    headers.append("Authorization", token);
    const requestOptions = {
      method: "DELETE",
      headers: headers,
    };
    fetch(`http://localhost:1000/api/v2/task/${taskId}`, requestOptions)
      .then((response) => response.json())
      .then((data: Message) => {
        console.log(data.message);
        setRefetch(!refetch);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  const changeStatus = (taskId: string, taskStatus: string) => {
    let status;
    const id = taskId;
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const token = JSON.parse(localStorage.getItem("token")!);
    headers.append("Authorization", token);

    if (taskStatus === "pending") {
      status = "completed";
    } else {
      status = "pending";
    }
    let payload = {
      status: status,
    };
    const requestOptions = {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(payload),
    };
    fetch(`http://localhost:1000/api/v2/task/status/${id}`, requestOptions)
      .then((response) => response.json())
      .then((data: ITask) => {
        console.log(data);
        setRefetch(!refetch);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    let payload = {
      description: data.description,
    };
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const token = JSON.parse(localStorage.getItem("token")!);
    headers.append("Authorization", token);
    if (!selectedTask) {
      const requestOptions = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(payload),
      };

      fetch(`http://localhost:1000/api/v2/projects/${id}`, requestOptions)
        .then((response) => response.json())
        .then((data: ITask) => {
          console.log(data);
          setRefetch(!refetch);
          modalClose();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      id = selectedTask._id;
      const requestOptions = {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(payload),
      };
      fetch(`http://localhost:1000/api/v2/task/${id}`, requestOptions)
        .then((response) => response.json())
        .then((data: ITask) => {
          console.log(data);
          setRefetch(!refetch);
          modalClose();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    if (isLoggedIn === true) {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      const token = JSON.parse(localStorage.getItem("token")!);
      console.log(token);
      headers.append("Authorization", token);

      const requestOptions = {
        method: "Get",
        headers: headers,
      };
      fetch(`http://localhost:1000/api/v2/projects/${id}`, requestOptions)
        .then(async (response) => await response.json())
        .then((data: ITaskResponse) => {
          console.log(data.tasks);
          data.tasks && setList(data.tasks);
        })
        .catch((err) => console.log(err));
    }
  }, [isLoggedIn, refetch, id]);

  const handleShowModal = (item?: ITask) => {
    setValue("description", item?.description ?? "");
    setSelectedTask(item);
    setShow(true);
  };

  return (
    <div className="container">
      {isLoggedIn ? (
        <>
          <span className="d-flex justify-content-between my-3">
            <h2>Your Task list</h2>
            <button
              className="btn btn-primary"
              onClick={() => {
                handleShowModal();
              }}
            >
              Create new task
            </button>
          </span>

          <Modal show={show} onHide={modalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Enter the task description </Modal.Title>
            </Modal.Header>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Modal.Body>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Description
                  </label>
                  <input
                    {...register("description", { required: true })}
                    defaultValue={selectedTask?.description}
                  />
                  {errors.description && <span>This field is required</span>}
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
                <button type="submit" className="btn btn-primary">
                  Save changes
                </button>
              </Modal.Footer>
            </form>
          </Modal>

          <ul className="list-group">
            {list?.map((task) => {
              return (
                <li
                  key={task._id}
                  className=" d-flex justify-content-between align-items-center list-group-item"
                >
                  <span style={{ flex: "0.5" }}>{task.description}</span>
                  <span
                    className={
                      task.status === 'pending'
                        ? 'badge bg-warning my-2'
                        : 'badge bg-success my-2'
                    }
                  >
                    {task.status}
                  </span>
                  {task.createdDate &&
                    new Date(task.createdDate).toLocaleDateString()}
                  {/* <Link to={`/taskForm/${task._id}`}> */}
                  <button
                    type="button"
                    onClick={() => {
                      handleShowModal(task);
                    }}
                    className="mr-2 btn btn-primary"
                  >
                    Edit
                  </button>
                  {/* </Link> */}
                  <button
                    onClick={() => task?._id && deleteTask(task._id)}
                    type="button"
                    className="mr-2 btn btn-danger"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() =>
                      task?._id &&
                      task?.status &&
                      changeStatus(task._id, task.status)
                    }
                    type="button"
                    className="mr-2 btn btn-warning"
                  >
                    Change Status
                  </button>
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <h2>Please login first to see your task list</h2>
      )}
    </div>
  );
};

export default TodoList;

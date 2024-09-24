import React from "react";
import { useEffect, useRef, useState } from "react";

function Todolist() {
  let nombreRef = useRef(null);
  const [task, setTask] = useState([]);
  const [urlApi] = useState("http://assets.breatheco.de/apis/fake/todos/user/cpizarroi");

  useEffect(() => {
    getTask(urlApi);
  }, []);

  const getTask = (url) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setTask(data)) // Guardar tareas en el estado
      .catch((error) => console.log(error));
  };

  const getUser = (url) => {
    fetch(url, {
      method: "POST",
      body: JSON.stringify([]),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data.result))
      .catch((error) => console.log(error));
  };

  const updateTask = (url, task) => {
    fetch(url, {
      method: "PUT",
      body: JSON.stringify(task),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

  const addTask = (e) => {
    if (e.keyCode === 13 && nombreRef.current.value !== "") {
      const newTask = { label: nombreRef.current.value, done: false };
      const updatedTasks = task.concat(newTask);
      setTask(updatedTasks);
      updateTask(urlApi, updatedTasks); // Actualiza las tareas en la API
      nombreRef.current.value = "";
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = task.filter((_, i) => i !== index);
    setTask(updatedTasks);
    updateTask(urlApi, updatedTasks); // Actualiza las tareas en la API
  };

  const deleteAll = () => {
    fetch(urlApi, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

  return (
    <div className="container">
      <div className="card mt-4">
        <div className="card-body">
          <h1 className="card-title text-center">
            To do list <i className="fas fa-tasks"></i>
          </h1>
          <ul className="list-group list-group-flush">
            <div className="input-group mb-2 list-group list-group-flush">
              <input
                onKeyUp={addTask}
                ref={nombreRef}
                type="text"
                id="input"
                className="list-group-item"
                placeholder="What needs to be done?"
              />
            </div>

            {task.length === 0 && (
              <li className="list-group-item text-center">
                No tasks, add tasks
              </li>
            )}

            {task.length > 0 &&
              task.map((valor, index) => {
                return (
                  <li
                    className="list-group-item d-flex justify-content-between align-items-center"
                    key={index}
                  >
                    {valor.label}
                    <i
                      className="fas fa-trash delete-icon"
                      onClick={() => deleteTask(index)}
                    ></i>
                  </li>
                );
              })}
          </ul>
        </div>
        <div className="card-footer text-muted">
          Things to do {task.length}
        </div>
      </div>
    </div>
  );
}

export default Todolist;

import React, { useRef, useState } from "react";

function Todolist() {
  let nombreRef = useRef(null);
  const [task, setTask] = useState([]);

  const addTask = (e) => {
    if (e.key === "Enter" && nombreRef.current.value.trim() !== "") {
      setTask([...task, nombreRef.current.value]); 
      nombreRef.current.value = ""; 
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = task.filter((_, i) => i !== index);
    setTask(updatedTasks); 
  };

  return (
    <div className="container">
      <div className="card mt-4">
        <div className="card-body">
          <h1 className="card-title text-center">
            To do list <i className="fas fa-tasks"></i>
          </h1>
          <div className="input-group mb-2">
            <input
              onKeyUp={addTask}
              ref={nombreRef}
              type="text"
              className="list-group-item"
			  style={{ width: '100%' }}

              placeholder="What needs to be done?"
            />
          </div>
          <ul className="list-group list-group-flush">
            {task.length === 0 ? (
              <li className="list-group-item">No task, add task</li>
            ) : (
              task.map((valor, index) => (
                <li
                  className="list-group-item d-flex justify-content-between align-items-center"
                  key={index}
                >
                  {valor}
				  <i
                      className="fas fa-trash delete-icon"
                      onClick={() => deleteTask(index)}
                    ></i>

                </li>
              ))
            )}
          </ul>
        </div>
        <div className="card-footer text-muted">
          Things to do: {task.length}
        </div>
      </div>
    </div>
  );
}

export default Todolist;

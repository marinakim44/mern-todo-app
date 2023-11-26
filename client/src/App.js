import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTask, deleteTaskRedux, updateTaskRedux } from "./slices/taskSlice";

function App() {
  // variables
  const dispatch = useDispatch();

  // local data state
  const [task, setTask] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [updatedTask, setUpdatedTask] = useState({});

  const reduxTasks = useSelector((state) => state.task);

  // function
  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(addTask({ name: task }));
    setTask("");
  };

  const deleteTask = (id) => {
    dispatch(deleteTaskRedux({ id: id }));
  };

  const handleChangeUpdate = (e) => {
    const { name, value } = e.target;

    setUpdatedTask((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const updateTask = (id) => {
    console.log("Updating task", id);
    dispatch(updateTaskRedux({ id: id, name: updatedTask[id] }));
    setIsUpdate(false);
  };

  return (
    <div>
      <div style={{ padding: 10 }}>
        <h1>ToDo App</h1>
        <p style={{ fontStyle: "italic" }}>
          Date: {new Date().toLocaleDateString()}
        </p>
        <div
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          <Form>
            <Form.Group>
              <Form.Control
                style={{ marginBottom: 10 }}
                placeholder="Type here..."
                onChange={handleChange}
                value={task}
              />
            </Form.Group>
          </Form>

          <Button onClick={handleSubmit} style={{ marginBottom: 20 }}>
            Add Task
          </Button>
        </div>

        {reduxTasks.map((elem, index) => {
          return (
            <div
              style={{
                borderRadius: "7px",
                padding: 10,
                margin: "10px 0px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
              key={index}
            >
              <Form.Control
                onClick={() => setIsUpdate(true)}
                onChange={handleChangeUpdate}
                value={updatedTask[elem.id] ? updatedTask[elem.id] : elem.name}
                name={elem.id}
                style={{ marginRight: 5 }}
              />
              <Button
                variant={isUpdate ? "outline-primary" : "success"}
                onClick={() =>
                  isUpdate ? updateTask(elem.id) : deleteTask(elem.id)
                }
              >
                {isUpdate ? "Update" : "Done"}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;

import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  addTaskRedux,
  deleteTaskRedux,
  updateTaskRedux,
} from "./slices/taskSlice";

function App() {
  // local data state
  const [task, setTask] = useState("");
  const dispatch = useDispatch();

  // const [tasks, setTasks] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [updatedTask, setUpdatedTask] = useState({});

  const tasks = useSelector((state) => state.task);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3001/get-all-tasks")
  //     .then((res) => {
  //       console.log(res.data);
  //       setTasks(res.data);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  // function
  const handleChange = (e) => {
    console.log("event", e.target.value);
    setTask(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      addTaskRedux({
        name: task,
      })
    );

    setTask("");

    // axios
    //   .post("http://localhost:3001/save-task", {
    //     taskName: task,
    //   })
    //   .then((res) => {
    //     console.log(res.data);
    //     if (res.data === "Task saved") {
    //       console.log("task added successfully...");
    //       setTask("");
    //       window.location.reload();
    //     }
    //   })
    //   .catch((err) => console.log(err));
  };

  const deleteTask = (id) => {
    dispatch(deleteTaskRedux({ id: id }));

    // axios
    //   .delete(`http://localhost:3001/delete-task/${id}`)
    //   .then((res) => {
    //     console.log(res.data);
    //     if (res.data === "Task deleted") {
    //       window.location.reload();
    //     }
    //   })
    //   .catch((err) => console.log(err));
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
    dispatch(
      updateTaskRedux({
        id: id,
        name: updatedTask[id],
      })
    );

    setIsUpdate(false);

    // console.log("Updating task");
    // axios
    //   .put(`http://localhost:3001/update-task/${id}`, {
    //     taskName: updatedTask[id],
    //   })
    //   .then((res) => {
    //     console.log(res.data);
    //     setIsUpdate(false);
    //   })
    //   .catch((err) => console.log(err));
  };

  console.log(tasks);

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

        {tasks.map((elem, index) => {
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
                // value={elem.id}
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
        {/* <Button onClick={() => navigate("counter")}>Go to counter</Button> */}
      </div>
    </div>
  );
}

export default App;

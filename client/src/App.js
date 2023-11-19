import { useState } from "react";
import axios from 'axios';

function App() {
  // local data state
  const [task, setTask] = useState("");

  // function
  const handleChange = (e) => {
    console.log("event", e.target.value);
    setTask(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:3001/save-task', {
      taskName: task
    })
    .then(res => console.log(res.data))
    .catch(err => console.log(err))
  }

  return (
    <div>
      <div>
        <h1>ToDo App</h1>
        <p style={{ fontStyle: "italic" }}>
          Date: {new Date().toLocaleDateString()}
        </p>
        <div style={{display:'flex', flexDirection:'column', width:'50%'}}>
          <input style={{marginBottom: 10}} placeholder="Type here..." onChange={handleChange} />
          <button onClick={handleSubmit}>Add Task</button>
        </div>
      </div>
    </div>
  );
}

export default App;

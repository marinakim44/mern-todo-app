// imports
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// variables
const port = process.env.PORT || 3001;

// app initialization
const app = express();

// middleware
app.use(express.json());
app.use(cors());

// database connection
mongoose
  .connect("mongodb://127.0.0.1:27017/mern-todo-app-db")
  .then(() => console.log("Database connected"))
  .catch((error) => console.log(error));

const taskSchema = new mongoose.Schema({
  taskName: String,
});

const Task = new mongoose.model("Task", taskSchema);

// API routes
app.get("/", (req, res) => {
  res.send("Express server is running...");
});

app.post("/save-task", (req, res) => {
  console.log(req.body);

  const newTask = new Task({
    taskName: req.body.taskName,
  });

  newTask
    .save()
    .then((doc) => {
      console.log(doc);
      res.send("Task saved");
    })
    .catch((err) => console.log(err));
});

app.get("/get-all-tasks", (req, res) => {
  console.log("Reading all tasks...");
  Task.find()
    .then((docs) => {
      console.log(docs);
      res.json(docs);
    })
    .catch((err) => console.log(err));
});

app.delete("/delete-task/:id", (req, res) => {
  console.log(req.params);

  Task.deleteOne({ _id: req.params.id })
    .then((doc) => {
      console.log(doc);
      res.send("Task deleted");
    })
    .catch((err) => console.log(err));
});

app.put("/update-task/:id", (req, res) => {
  console.log(req.params, req.body);

  Task.findOneAndUpdate(
    { _id: req.params.id },
    {
      taskName: req.body.taskName,
    }
  )
    .then((doc) => {
      console.log(doc);
      res.send("Task updated");
    })
    .catch((err) => console.log(err));
});

// server launch
app.listen(port, function () {
  console.log("Server is running on port: ", port);
});

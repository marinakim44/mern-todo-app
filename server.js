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

const Task = new mongoose.model("Item", taskSchema);

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

// other api endpoints
app.delete("/delete-task/:id", (req, res) => {
  console.log(req.body);
});
app.delete("/delete-task/:id", (req, res) => {
  console.log(req.body);
});

// server launch
app.listen(port, function () {
  console.log("Server is running on port: ", port);
});

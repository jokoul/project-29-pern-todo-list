const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const path = require("path");
require("dotenv").config();

//middleware
app.use(express.json()); //allow to give access to request and transform the body to json data.
app.use(cors()); // to set cors that allow program from different domain to connect each other.

//ROUTES

//create a todo
app.post("/todos", async (req, res) => {
  //anytime we request from some data it's gonna take time that's why we use async/await
  try {
    //try catch make easy to manage error
    // console.log(req.body);
    const { description } = req.body;
    // console.log("description : " + description);
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES ($1) RETURNING *", //returning * is used to returned data after request execution.
      [description]
    ); //$1 represent a placeholder and we pass as 2nd parameter an array of values to bind with the placeholder
    res.json(newTodo.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

//get all todos
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    // console.log(allTodos);
    res.json(allTodos.rows);
  } catch (error) {
    console.error(error.message);
  }
});

//get a todo
app.get("/todos/:id", async (req, res) => {
  try {
    // console.log(req.params);
    const { id } = req.params; // we retrieve by destructuring the value of the parameter 'id' inside req.params object
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id=$1", [id]);
    // console.log(todo);
    res.json(todo.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

//update a todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(req.params);
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET description=$1 WHERE todo_id=$2",
      [description, id]
    );
    res.json("Todo was updated!");
  } catch (error) {
    console.error(error.message);
  }
});

//delete a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = pool.query("DELETE FROM todo WHERE todo_id=$1", [id]);
    res.json("Todo has deleted!");
  } catch (error) {
    console.error(error.message);
  }
});

//Catch all methods
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

//Deployment with Heroku
if (process.env.NODE_ENV === "production") {
  //we create a "build" folder in "client"
  app.use(express.static("./client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//listen to the port
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server has started on port ${port}.`);
});

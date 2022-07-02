import React, { Fragment, useEffect, useState } from "react";

import EditTodo from "./EditTodo";

export default function ListTodos() {
  const [todos, setTodos] = useState([]); //default value empty array

  //delete todo function
  const deleteTodo = async (id) => {
    try {
      const deleteTodo = await fetch(`/todos/${id}`, {
        //we remove "http://localhost:5000" before "todos" because we use proxy in package json
        method: "DELETE",
      });
      //   console.log(deleteTodo);
      //to refresh the list of todo without reloading
      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  //function to get all todos
  const getTodos = async () => {
    try {
      const response = await fetch("/todos"); //we remove "http://localhost:5000" before "todos" because we use proxy in package json
      const jsonData = await response.json(); //we parse the response from json data to javascript object
      // console.log(jsonData);
      setTodos(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  //   console.log(todos);

  return (
    <Fragment>
      <table className="table mt-5">
        <thead>
          <tr>
            <th scope="col">Description</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {/* 
          <tr>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
         */}
          {todos.map((todo) => (
            <tr key={todo.todo_id}>
              <td>{todo.description}</td>
              <td>
                <EditTodo todo={todo} />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTodo(todo.todo_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
}

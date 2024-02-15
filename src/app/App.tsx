import React, { useState, useEffect } from "react";
import TodoItem from "../components/TodoItem/TodoItem";
import "./app.css";

export interface Todo {
  id: number;
  todo: string;
  checked: boolean;
}

function App() {
  const initialState: Todo[] = JSON.parse(window.localStorage.getItem("data") || "[]");
  const [todos, setTodos] = useState<Todo[]>(initialState);
  const [addTodo, setAddTodo] = useState("");

  useEffect(() => {
    window.localStorage.setItem("data", JSON.stringify(todos));
  }, [todos]);

  const handleAdd = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newTodo = {
      id: todos.length + 1,
      todo: addTodo,
      checked: false,
    };

    setTodos([...todos, newTodo]);
    setAddTodo("");
  };

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const id = Number(event.target.value);

    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, checked: !todo.checked } : todo
    );

    setTodos(newTodos);
  };

  const handleRemove = (id: number): void => {
    const newTodos = todos.filter((todo) => todo.id !== id);

    setTodos(newTodos);
  };

  const handleEditTodo = (id: number, editTodo: string): void => {
    const newTodos = todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo));

    setTodos(newTodos);
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="name">Todo</h1>
        <form onSubmit={(event) => handleAdd(event)} className="add">
          <label>
            <input
              type="text"
              value={addTodo}
              onChange={(event) => setAddTodo(event.target.value)}
              name="name"
            />
          </label>
          <input type="submit" value="Add" />
        </form>
        {todos &&
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              {...todo}
              handleCheck={handleCheck}
              handleRemove={handleRemove}
              handleEditTodo={handleEditTodo}
            />
          ))}
      </div>
    </div>
  );
}

export default App;

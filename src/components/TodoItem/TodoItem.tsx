import React, { useState } from "react";
import "./todoItem.css";

interface Props {
  id: number;
  todo: string;
  checked: boolean;
  handleCheck: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemove: (id: number) => void;
  handleEditTodo: (id: number, editTodo: string) => void;
}

const TodoItem = ({ id, todo, checked, handleCheck, handleRemove, handleEditTodo }: Props) => {
  const [editTodo, setEditTodo] = useState("");
  const [editForm, setEditForm] = useState(false);

  return (
    <div className="item">
      {!editForm ? (
        <>
          <div className="todo">
            <input type="checkbox" checked={checked} value={id} onChange={handleCheck} />
            <h3 className="name">{todo}</h3>
          </div>
          <div className="right">
            <button className="delete" onClick={() => handleRemove(id)}>
              Delete
            </button>
            <button className="edit" onClick={() => setEditForm(!editForm)}>
              Edit
            </button>
          </div>
        </>
      ) : (
        <form onSubmit={() => handleEditTodo(id, editTodo)}>
          <label>
            <input
              type="text"
              value={editTodo}
              onChange={(event) => setEditTodo(event.target.value)}
              name="name"
            />
          </label>
          <input type="submit" value="Save" />
        </form>
      )}
    </div>
  );
};

export default TodoItem;

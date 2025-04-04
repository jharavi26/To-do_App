import React, { useEffect, useRef, useState } from 'react';
import "./style.css";

function TodoItem() {
  const [todo, setTodo] = useState(() => {
    const saveTodo = localStorage.getItem("todo");
    return saveTodo ? JSON.parse(saveTodo) : [];
  });

  const [inputValue, setInputValue] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todo));
  }, [todo]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const Addtodo = () => {
    if (!inputValue.trim()) return; // Prevent adding empty tasks

    if (isEdit) {
      const updatedTodos = [...todo];
      updatedTodos[editIndex] = inputValue;
      setTodo(updatedTodos);
      setIsEdit(false);
    } else {
      setTodo([...todo, inputValue]);
    }
    setInputValue("");
  };

  const deleteTask = (del_index) => {
    const removeItems = todo.filter((_, index) => index !== del_index);
    setTodo(removeItems);
  };

  function editTask(item, index) {
    setIsEdit(true);
    setInputValue(item);
    inputRef.current.focus();
    setEditIndex(index);
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") Addtodo();
  };

  return (
    <div className="todo">
      <h1>To-Do Application</h1>
      <div className="container">
        <input
          type="text"
          placeholder="Enter a Task"
          onChange={handleChange}
          value={inputValue}
          ref={inputRef}
          onKeyDown={handleKeyDown}
        />
        <button className="btn" onClick={Addtodo}>
          {isEdit ? "Update" : "Add"}
        </button>
      </div>
      <ol>
        {todo.map((item, index) => (
          <div key={index} className="li-text">
            <li>{item}</li>
            <div className="alignment">
              <button className="edit-btn" onClick={() => editTask(item, index)}>
                Edit
              </button>
              <button onClick={() => deleteTask(index)} className="delete-btn">
                Delete
              </button>
            </div>
          </div>
        ))}
      </ol>
    </div>
  );
}

export default TodoItem;

import React, { useEffect, useState } from 'react';
import "./style.css"

function TodoItem() {

  const [todo, setTodo] = useState(()=>{
    const saveTodo = localStorage.getItem("todo");
    return saveTodo ? JSON.parse(saveTodo) : []
  })
  const [inputValue, setInputValue] = useState("")
  const[editing, setEditing] = useState(false);

  useEffect(()=>{
    localStorage.setItem("todo", JSON.stringify(todo))
  },[todo])

  const handleChange=(e)=>{
    setInputValue(e.target.value)
  }

  const Addtodo = ()=>{
    setTodo([...todo, inputValue]);
    setInputValue("")
  }

  const deleteTask = (del_index)=>{
    const removeItems = todo.filter((_, index)=>{
     return  index !== del_index;
    });
    setTodo(removeItems);
  }

  const editTask = ()=>{
    setEditing(true);
  }


  return (
    <div className='todo'>
    <div className='container'>
       <h1>To-Do Application</h1>
       <input type='text' placeholder='Enter a Task' onChange={handleChange} value = {inputValue}></input>
       <button className='btn' onClick={Addtodo}>Add</button>
      <ol>
        {
          todo.map((item, index)=>(
            <li key = {index} >{item} <button className='edit-btn' onClick={editTask}>Edit</button><button onClick={()=>deleteTask(index)} className='delete-btn'>Delete</button></li>
          ))
        }
      </ol>
      
    </div>
    </div>
  )
}

export default TodoItem

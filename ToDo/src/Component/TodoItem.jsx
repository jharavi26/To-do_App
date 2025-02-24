import React, { useEffect, useRef, useState } from 'react';
import "./style.css"

function TodoItem() {

  const [todo, setTodo] = useState(()=>{
    const saveTodo = localStorage.getItem("todo");
    return saveTodo ? JSON.parse(saveTodo) : []
  })

  const [inputValue, setInputValue] = useState("");
  const [isEdit , setIsEdit] = useState(false);
  const [editValue, setEditValue] = useState("");



  const inputRef = useRef(null);

  useEffect(()=>{
    localStorage.setItem("todo", JSON.stringify(todo))
  },[todo])

  const handleChange=(e)=>{
    setInputValue(e.target.value)
  }

  const Addtodo = ()=>{
    if(isEdit){
      const index = todo.indexOf(editValue);
      const updateItem = [...todo];
      updateItem.splice(index , 1 , inputValue);
      setTodo(updateItem)
    }
    else{
    setTodo([...todo, inputValue]);
    }
    setIsEdit(false);
    setInputValue("")
  }

  const deleteTask = (del_index)=>{
    const removeItems = todo.filter((item, index)=>index !== del_index);
    setTodo(removeItems);
  }

  function editTask(item){
    setIsEdit(true);
    setInputValue(item);
    inputRef.current.focus();
    setEditValue(item)
  }

  const handleKeyDown = (e)=>{
    if(e.key === "Enter") Addtodo();
  }


  return (
    <div className='todo'>
   
       <h1>To-Do Application</h1>
       <div className='container'>
       <input type='text' placeholder='Enter a Task' onChange={handleChange} value = {inputValue} ref = {inputRef} onKeyDown={handleKeyDown} ></input>

       <button className='btn' onClick={Addtodo}>Add</button> 

       </div>
      <ol>
          {
          todo.map((item, index)=>(
            <div key = {index} className='li-text'>
            <li >{item} </li>

            <div className='alignment'>

            <button className='edit-btn' onClick={()=>editTask(item)}>Edit</button>
            <button onClick={()=>deleteTask(index)} className='delete-btn'>Delete</button>
            </div>
            </div>
          ))
        }    
        
      </ol>
      
    </div>
  )
}

export default TodoItem

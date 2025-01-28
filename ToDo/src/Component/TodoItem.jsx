import React, { useEffect, useRef, useState } from 'react';
import "./style.css"

function TodoItem() {

  const [todo, setTodo] = useState(()=>{
    const saveTodo = localStorage.getItem("todo");
    return saveTodo ? JSON.parse(saveTodo) : []
  })

  const [inputValue, setInputValue] = useState("");


  const inputRef = useRef(null);

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
    const removeItems = todo.filter((item, index)=>{
     return  index !== del_index;
    });
    setTodo(removeItems);
  }

  function editTask(id){
    const text = todo.filter((item, index) => index == id )
    inputRef.current.focus();
    setInputValue(text[0]);

  }

 

  return (
    <div className='todo'>
   
       <h1>To-Do Application</h1>
       <div className='container'>
       <input type='text' placeholder='Enter a Task' onChange={handleChange} value = {inputValue} ref = {inputRef} ></input>
       <button className='btn' onClick={Addtodo}>Add</button>
       </div>
      <ol>
          {
          todo.map((item, index)=>(
            <>
            <div className='li-text'>
            <li key = {index} >{item} </li>

            <div className='alignment'>

            <button className='edit-btn' onClick={()=>editTask(index)}>Edit</button>
            <button onClick={()=>deleteTask(index)} className='delete-btn'>Delete</button>
            </div>
            </div>
            
            </>
          ))
        }    
        
      </ol>
      
    </div>
  )
}

export default TodoItem

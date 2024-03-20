import React from 'react'
import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { FiEdit3 } from "react-icons/fi";
import { MdDelete } from "react-icons/md";



function Main() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setShowFinished] = useState(true)

  const toggleFinished = (e) => {
    setShowFinished(!showFinished)
  }


  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }

  }, [])



  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveToLS()
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveToLS()
  }

  const handleDelete = (e, id) => {
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveToLS()
  }

  const handleChange = (e) => {
    setTodo(e.target.value);
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()
  }



  return (
    <div className="flex md:h-full w-full rounded-xl justify-center my-10 bg-lime-200 dark:bg-lime-950">
      <div className='flex-col md:h-3/4 md:w-1/2 rounded-xl justify-center  bg-lime-500 border-lime-500 border-2 text-black overflow-y-scroll  dark:bg-lime-950 dark:text-lime-500 dark:border-lime-500 dark:border-2'>

        {/* input section */}
        <h1 className='font-bold text-xl text-center mt-5 '>Add Your Tasks</h1>

        <div className=" justify-center h-10 mb-10 gap-5 px-2">
          <input type="text" onChange={handleChange} value={todo} className='rounded-xl border-2 bg-lime-200  border-lime-900 px-1 flex text-center w-full my-2 h-full dark:bg-lime-950 dark:border-lime-500' placeholder='Enter the task' />
          <button onClick={handleAdd} disabled={todo.length == 0} className='bg-lime-800 w-full rounded-xl text-xs p-2 disabled:bg-lime-600 disabled:cursor-no-drop text-white dark:disabled:bg-lime-800 dark:bg-lime-600 hover:bg-lime-950'>Add</button>
        </div>
        <div className=' flex gap-5 m-5'>
          <input onClick={toggleFinished} type="checkbox" checked={showFinished} className='mt-5' />
          <label className='mt-5'>Show Finished</label>
        </div>
        <h1 className='font-bold text-xl text-center mt-5 '>Your Tasks</h1>

        {/* tasks section */}
        {todos.length == 0 && <div className=' text-center '>nothing in here</div>}
        {todos.map(item => {
          return (showFinished || !item.isCompleted) && <div key={item.id} className='flex justify-between px-5  my-2 rounded-xl'>
            <div className=' flex gap-5 '>
              <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
              <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
            </div>
            <div className=' flex gap-2 '>
              <button className=' h-full ' onClick={(e) => { handleEdit(e, item.id) }}><FiEdit3 /></button>
              <button className=' h-full ' onClick={(e) => { handleDelete(e, item.id) }}><MdDelete /></button>
            </div>

          </div>
        })}
      </div>


    </div>
  )
}

export default Main
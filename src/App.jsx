import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar';
import Main from './components/Main';

function App() {
  const [todo, setTodo] = useState([]);
  return (
    <div className=' bg-lime-200 h-screen rounded-2xl m-5'>
    <Navbar/>
    <Main/>
    </div>
  )

}

export default App

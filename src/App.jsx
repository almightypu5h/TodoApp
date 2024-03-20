import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar';
import Main from './components/Main';

function App() {
  return (
    <div className=' bg-lime-200 h-screen rounded-2xl dark:bg-lime-950'>
    <Navbar/>
    <Main/>
    </div>
  )

}

export default App

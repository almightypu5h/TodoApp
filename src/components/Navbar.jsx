import { useState, useEffect } from 'react'

function Navbar() {

    const [theme, setTheme] = useState(null)

    useEffect(() => {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme("dark")
        } else {
            setTheme("light")
        }
    }, [])

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        }
        else {
            document.documentElement.classList.remove("dark");
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme == "dark" ? "light" : "dark");
    };



    return (
        <nav className='flex justify-between bg-lime-500 border-2 border-lime-500 dark:bg-lime-950 dark:border-2 dark:border-lime-500'>
            <a href="" className='font-bold text-3xl m-3 dark:text-lime-500'><h1>Todo List</h1></a>
            <button className=" text-xs mx-5 dark:text-lime-500" onClick={toggleTheme}>Dark Mode</button>
        </nav>
    )
}

export default Navbar
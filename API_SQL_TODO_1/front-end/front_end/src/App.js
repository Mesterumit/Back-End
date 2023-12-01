
import Navbar from "./components/NavBar.jsx";
import Form  from './components/Form.jsx'
import Update from './components/Update'
import axios from 'axios'
import {useEffect, useState} from 'react'
import { Route, Routes } from 'react-router-dom';
function App() {
  
  const [tasks,setTasks] =useState([])

  useEffect(()=>{
  fetchTask()


  },[])
  const fetchTask = async ()=>{
    const res = await axios.get('http://localhost:8080')
    setTasks(res?.data?.result?.rows)
    // setTasks(res)
    console.log("res",res)
  }
  console.log("tasks :",tasks)
  return (
    <>
    <Navbar />
    <Routes>
      <Route path='/' element={<Form    tasks={tasks}  setTasks={setTasks}/> } />
      <Route path='/update/:id' element={<Update tasks={tasks} setTasks={setTasks} axios={axios} />} />
    </Routes>
     </>
  );
}

export default App;

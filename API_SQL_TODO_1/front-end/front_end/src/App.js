
import Navbar from "./components/NavBar.jsx";
import Form  from './components/Form.jsx'
import axios from 'axios'
import {useEffect, useState} from 'react'
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
    <div>

     <Navbar />
     <Form tasks={tasks} setTasks={setTasks}/>
    </div>
  );
}

export default App;


// import { jsx } from '@emotion/react';

// Your component code here


import {useState} from 'react'
import axios from 'axios'
// import {useRef} from 'react'
import update from './Update'
// import { Link } from 'react-router-dom';
import {useNavigate,useParams} from  'react-router-dom'




const Form = ({tasks,setTasks}) =>{
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [priorty,setPriorty] = useState()
    // const myInputRef = useRef()
    const navigate = useNavigate()
    const {id} = useParams()

    const handleUpdateClick =(id)=>{
        navigate(`/update/${id}`)
    }
    
    
    const submitHandler = async(e)=>{

        // if u do "e.preventDefault()" you can't see the outcome in browser
        // you can see tham in "db"
        // e.preventDefault()
        // the first parameter is the "url" , I just created for back-end
        // second paramater is the "body", the one i have in models
        const res = await axios.post('http://localhost:8080',{title,description,priorty})
        console.log('res', res)

    }

    const handleDelete = async (id) =>{

        // if u get an "index" from "li" item
        // then we need to do it in that way
        // in this function "index" will be instead of "id"

        // const updatedTasks = [...tasks]
        // updatedTasks.splice(index,1);

        // this on wis the second way of doing it with "id"
   
        try{
            
             await axios.delete(`http://localhost:8080/${id}`)

            const updatedTasks = tasks.filter((task)=> task.id !== id)
            setTasks(updatedTasks)

        }catch(error){
            console.log(error.message)
        }
    }

    console.log('component re-rendered')
    // console.log(myInputRef?.current?.value)
    return (
    <div className="card card-body shadow mt-5">
        <h1 className='text-center mb-3' >ADD TASK</h1>
        <form className="mt-3" onSubmit={submitHandler}>
         

          <div>
             {/* interview question

             is this input field is , controlled or uncontrolled ecent?
            it is a controlled , because to make the input controlled 
            you need to have an onChange and value ('you have to satte variable to as value propt') */}


            {/* if you want to make it uncontrolled, you need to have "ref" prop
            and need to import it "import {useRef}  from 'react'"
            and need to initilasi like a useState outside of the return
             onst myInputRef = useRef()
             after that ref={myInputref} in the "input" as prop
             and it become a " uncontrolled "
             uncontrolled is usefull if you dont want to get data without 
             clicking the submit button. but with controlled, it will get data, as long as u type anything
             such as input = absnd, when u type "a" u will see the "a" in dom, then "b" will see "b"
             but with uncontrolled " u will see the full of the word " after clicking the button
              */}
              <label htmlFor="priority"> Task title</label>
            <input
            className='form-control'
            type='text'
            placeholder ='Task Title'
            name='Title'
            value={title}
            onChange={(e)=> setTitle(e.target.value)}
            // ref={myInputRef}

            />
          </div>

          <div>
          <label htmlFor="priority">Task Description </label>
            <input
            className='form-control'
            type='text'
            name='description'
            placeholder='Task Description'
            value={description}
            onChange ={(e)=>setDescription(e.target.value)}
            />
          </div>

          <div class="mb-3">
          <label htmlFor="priority"> Priority</label>
            <input 
            className='form-control'
            type='number'
            name='Priorety'
            value={priorty}
            onChange={(e)=>setPriorty(e.target.value)}
            
            />
          </div>
          <div className="text-center">
          <button className='btn btn-primary'>Submit</button>
          </div>
          

        </form>
        <div  >
            <table  className="table table-bordered border-primary mt-5">
        <thead>
    <tr className='table-info'>
      <th scope="col">Priorty</th>
      <th scope="col">Task Title</th>
      <th scope="col">Task Description</th>
      <th scope="col" >Update</th>
      <th scope="col" >Delete</th>
    </tr>
  </thead>
  <tbody>
        
    {tasks.map((item, index) => {
        return (
        
    <tr key={index} className='table-light'>
      <th scope="row">{item.priorty}</th>
      <td>{item.title}</td>
      <td>{item.description}</td>
      <td style={{width:'10px'}}>
      <button type="button" className="btn btn-success" onClick={()=>handleUpdateClick(item.id)} style={{ margin: '2px' }}>Update</button>
      </td>
      <td style={{width:'10px'}}>
      <button type="button" className="btn btn-danger" onClick={()=> handleDelete(item.id)} style={{ margin: '2px' }}>Delete</button>
      </td>
    </tr>
   
        );
    })}
    </tbody>
    
           </table>
           
           </div>
          
 
 </div>

    )
    
}

export default Form;
{/* <div  key={index} style={{padding:'2px'}}>
<li key={index}  style={{width:'300px',display: 'flex', border:'2px solid gray'}}>
    {item.title}
    <button style={{marginLeft:'auto'}}
    onClick={()=>handleDelete(item.id)}
    >Delete</button>

      
      
    

    
    
</li>

</div> */}
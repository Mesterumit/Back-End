
import './App.css';
import {useState} from 'react'
function App() {

  // user creation form state:
  /*{
    "username": "test",
    "password": "1234",
    "email": "test@site.com",
    "isActive": true,
    "isStaff": false,
    "isAdmin": false
  }*/
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail]   = useState('');
  const [isActive, setIsActive] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  

   // function to create a user on user creation form submit:
   const handleCreate = async(e)=>{
    e.preventDefault();
    console.log('Hey bud, I am creating a user.')
    
    // route to create a user: http://localhost:3005/users/

    const response = await fetch("http://localhost:3005/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        {
          "username": userName,
          "password": password,
          "email": email,
          "isActive": isActive,
          "isAdmin": isAdmin
        })
    })
    // response.json(): This is a method that reads
    //  the response body and parses it as JSON. The 
    //  json method returns a Promise that resolves 
    //  to the JavaScript object described by the JSON string.
    const data = await response.json();
  
  }
  //Login form state
  const [loginUserName, setLoginUserName] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [user, setUser] = useState(null);

    const handleLogin = async(e)=>{
      e.preventDefault()
      console.log("I am loggin in.")
      console.log(loginUserName, loginPassword);

      const response = await fetch("http://localhost:3005/auth/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(
          {
            "username": loginUserName,
            "password": loginPassword
          })
      })
  
      const data = await response.json();
      console.log(data);
      setUser(data)
      console.log("I have logeed in")
      console.log("TOKEN :",data.token.access)
      //save teh token yp local storage
      try{
        localStorage.setItem('accessToken', data.token.access)
        localStorage.setItem('refreshToken', data.token.refresh)
        console.log("Tokens successfully saved to local storage")
      }catch(err){
        console.log(err)

      }
    }
    // function to get users list
    const [users, setUsers] = useState([]);

    const getUsers = async()=>{
      console.log("Getting users list")
     const response = await fetch("http://localhost:3005/users/",{
      method:"GET",
      headers:{
        "Content-Type":"application/json",
        "Authorization":`Bearer ${localStorage.getItem("accessToken")}`

      }
     })
     const data = await response.json()
     setUsers(data.data)
     // we do "data.data" because it is setted in db like that
     console.log("data :",data)
     console.log('Access Token:', localStorage.getItem("accessToken"));

    } 
    const getUser = async(id)=>{

      const response = await fetch(`http://localhost:3005/users/${id}`,{
        method:"GET",
        headers:{
          "Content-Type":"aplication/json",
          "Authorization":`Bearer ${localStorage.getItem('accessToken')}`,

        }
      })
      const data = await response.json()
      setUser(data.user)
    }
   
   return (
    <div className="App">
     
     {/* Create user form */}
     <div id="userFormContainer">
        <form id="userCreationForm" onSubmit={handleCreate} >
          <h1>User Creation:</h1>

          <label htmlFor="username" >Username</label>
          <input type="text" name="username" id="username" value={userName}  onChange={e => setUserName(e.target.value)} />

          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />

          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" value={email} onChange={e => setEmail(e.target.value)} />

          <label htmlFor="isActive">Active</label>
          <input type="checkbox" name="isActive" id="isActive"  checked={isActive} onChange={e => setIsActive(e.target.checked)} />

          <label htmlFor="isAdmin">Admin</label>
          <input type="checkbox" name="isAdmin" id="isAdmin" checked={isAdmin} onChange={e => setIsAdmin(e.target.checked)}  />

          <button type="submit" >Craete User</button>
        </form>

         {/* login form: */}

         <form id="userLoginForm" onSubmit={handleLogin} >
          <h1>Login:</h1>

          <label htmlFor="username">Username</label>
          <input type="text" name="username" id="username" value={loginUserName} onChange={e => setLoginUserName(e.target.value)} />

          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password"  value={loginPassword} onChange={e => setLoginPassword(e.target.value)} />

          <input type="submit" value="Login" />
        </form>
      </div>
      <button onClick={getUsers}><h1>Get Users List</h1></button>
      {
        users?.map((user, index) => {
          return (
            <div key={index} onClick={()=>{getUser(user._id)}}>
              <h1>{user.username}</h1>
              <h3>{user.email}</h3>
              <h3>{user.isAdmin? "Admin" : "Not Admin"}</h3>
            </div>
          )
        })
      }

    </div>
  );
}

export default App;

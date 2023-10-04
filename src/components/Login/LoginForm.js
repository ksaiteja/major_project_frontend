import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage,setErrorMessage]=useState('');
  const [isValid,setIsValid]=useState(true)
  const navigate=useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    
    const user={
      username : username,
      password : password
    }
    const requestOptions={
      method:'POST',
      headers:{'content-type':'application/json'},
      body:JSON.stringify(user)
    }
    //https://smart-attendance-fr.onrender.com/api/login/validate
    fetch("http://localhost:4000/api/login/validate",requestOptions)
    .then((response) => response.json())
      .then((data)=>{
        console.log(data)
        if(data.success){
          if(data.role==="admin"){
            navigate("/admin")
          }
          else if(data.role==="student"){
            navigate("/student")
          }
          else if(data.role==="analyst"){
            navigate("/analyst")
          }
        }
        else{
          setErrorMessage(data.msg)
          setIsValid(false)
        }
      }).catch((err)=>{
          console.log(err)
      })
  };

  return (
    <form className="login-form flex flex-col space-y-5 p-10 bg-gray-200 mb-20 rounded-lg" onSubmit={handleLogin}>
      <h2 className="text-2xl mb-4">Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border rounded-md p-2 mb-2 w-80"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border rounded-md p-2 mb-4"
      />
      {!isValid && <p className='text-red-600'>{errorMessage}</p>}
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700">
        Login
      </button>
    </form>
  );
}

export default LoginForm;

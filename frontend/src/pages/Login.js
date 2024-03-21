import React,{ useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

import Photo from "../photos/FARMER IMAGE.png"
import Photo1 from "../photos/Background.jpeg"

import BackButton from "../components/BackButton.js"
import "../styles/Login.css"

function Login() {

  const navigate = useNavigate()

  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')

  const handleSubmit = async (e) => {
    try{
        e.preventDefault()
        const data = {username,password}
        const response = await axios.post('/login', data);
        if(response.status===200)
        {
          navigate('/home')
        }
    }catch(error){
        alert(error.response.data)
        console.log(error.response.data)
    }
  }

  function handleNavigate() {
	navigate("/signup")
  }

  return (
    <div>
    
    <img src={Photo} alt="Image" class="login-image"/>
    <h1 class="body">Login</h1>
    <form class="LoginPage" onSubmit={handleSubmit}>
        <input required type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)} class="username-input"></input>
        <input required type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} class="password-input"></input>
        <a onClick={handleNavigate} class="blue-text-link">Don't have an account? Sign up</a>
        <button class="login-button">Login</button>
    </form>
  
	</div>
  )
}

export default Login
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import axios from 'axios'

import Photo from "../photos/FARMER IMAGE.png"
import Photo1 from "../photos/Background.jpeg"

import BackButton from "../components/BackButton.js"
import "../styles/Signup.css"

function SignUp() {

  const navigate = useNavigate()

  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [repassword,setRepassword] = useState('')
  const [pincode, setPincode] = useState('')

  const handleSubmit = async (e) => {
    try{
        e.preventDefault()
        if(password!==repassword)
        {
          alert('Passwords do not match')
          return
        }
        if(password.length < 6)
        {
          alert('Password must be atleast 6 characters')
          return
        }
        const data = {username,password, pincode}
        console.log(data)
        const response = await axios.post('/signup', data);
        if(response.status===200)
        {
            navigate('/login')
        }
        else{
            throw new Error('sign up unsuccessful')
        }
    }catch(error){
        alert(error.response.data)
    }
  }

  function handleNavigate() {
	navigate("/login")
  }

  return (
    <div>
		{/* <BackButton /> */}
    
    <div class="bracket">
    <img src={Photo} alt="Image" class="login-image"/>
		<h1 className="h2-sizing gradient-text">Sign up</h1>

        
    <form onSubmit={handleSubmit} class="signup-form__form">

    <input required type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} class="signup-input"></input>

    <input required type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} class="signup-input"></input>

    <input required type="password" placeholder="Re-enter password" onChange={(e) => setRepassword(e.target.value)} class="signup-input"></input>

    <input required type="number" placeholder="Pincode" onChange={(e) => setPincode(e.target.value)} class="signup-input"></input>

    <a onClick={handleNavigate} class="blue-text-link">Already have an account? Log in</a>

    <button type="submit" class="gradient-button">Signup</button>
    
</form>
</div>

    </div>
  )
}

export default SignUp
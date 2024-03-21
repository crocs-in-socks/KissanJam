import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function Home() {

    const navigate = useNavigate()
    const handleLogout = async () => {
        try {
          const response = await axios.post('/logout')
          if(response.status === 200) {
            navigate('/login')
          }
        }
        catch(error) {
          console.log(error)
        }
    }

    return (
        <div>
            Home
            <a className="logout-button" onClick={handleLogout}>Logout</a>
        </div>
  )
}

export default Home
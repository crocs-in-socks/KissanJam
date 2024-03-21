import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function Home() {

    const [neighbours, setNeighbours] = useState([])
    const [range, setRange] = useState(10)

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

    const handleRangeIncrease = async() => {
        const newRange = range + 2
        setRange(newRange)
    }

    const handleRangeDecrease = async() => {
        const newRange = range - 2
        setRange(newRange)
    }

    const fetchNeighbours = async(range)=>{
        try {
            console.log(range)
            const response = await axios.get('/getneighbours', { params: { range: range } })
            if (response.status === 200) {
                console.log(response.data)
                setNeighbours(response.data)
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(()=>{
        fetchNeighbours(range)
    },[range])

    return (
        <div>
            <div>
                <button className="logout-button" onClick={handleLogout}>Logout</button>
            </div>
            <div>Home page, Hot Farmers near you</div>
            <button onClick={handleRangeIncrease}>Increase range</button>
            <button onClick={handleRangeDecrease}>Decrease range</button>
            <ul>
                {neighbours.map(item => (<li key={item._id}>{item.username}</li>))}
            </ul>
        </div>
  )
}

export default Home
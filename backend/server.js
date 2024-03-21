const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');
const axios = require('axios')
require('dotenv').config()

const {signup, login} = require('./routers/userRouter')
//const cors = require('cors');

const app = express()

app.use(bodyParser.json());
app.use(cookieParser())
//app.use(cors());
mongoose.connect(process.env.MONGOURL)

//app.get('/', (req, res) => res.send("hello, world!"))

async function fetchData() {
    try {
        const response = await axios.get('https://commodity-rates-api.p.rapidapi.com/latest',
        {
            headers: {
                'X-RapidAPI-Key': '88ba3ce860msh7684bcabaa4319dp109348jsn747020f2855a',
                'X-RapidAPI-Host': 'commodity-rates-api.p.rapidapi.com'
            }
        }, {params: {
            start_date: '2022-01-10',
            end_date: '2022-01-20',
            base: 'USD',
            symbols: 'INR'
          }} );
        return response.data;
    } 
    catch (error) {
        console.error('Error fetching data:', error);
        throw error; 
    }
}

async function fetchAndLogData() {
    try {
        const data = await fetchData();
        console.log(data);
    } catch (error) {
        console.error('Error fetching and logging data:', error);
    }
}

fetchAndLogData();
  
const verifyToken = (req, res, next) => {
    const token = req.cookies.jwtToken;
    if (!token) {
        return res.status(401).json({message: 'Token not found'});
    }
    jwt.verify(token,'appetitejwtkey', (error, decoded) => {
        if (error) {
            res.clearCookie('jwtToken', { path: '/' });
            return res.status(403).json({message: 'Invalid token'})
        }
        req.userId = decoded.userId;
        next();
    });
};

app.get('/getneighbours', verifyToken, async(req, res) => {
    const userId = req.userId
    const range = req.query.range
    try {
        users = await getNeighbours(userId, range)
        res.json(users)
    } catch(error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/checkjwt',verifyToken,(req,res)=>{ //Used for client side authentication
    res.status(200).send()
})

app.post('/signup',async (req,res)=>{
    try{
        const { username, password, pincode } = req.body;
        await signup(username, password, pincode);
        res.status(200).send('Signup successful');
    }
    catch(e)
    {
        res.status(400).send(e.message)
    }
})

app.post('/login', async (req, res) => {
    try {
        res.clearCookie('jwtToken', { path: '/' });
        const { username, password } = req.body;
        const token = await login(username, password);

        res.cookie('jwtToken', token, {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 3600000,
            path: '/'
        });
        res.status(200).send();
    } catch (e) {
        res.status(400).send(e.message);
    }
});
app.post('/logout',(req,res)=>{
    res.clearCookie('jwtToken', { path: '/' });
    res.status(200).send()
})

app.listen(5000, () => console.log("Server listening on http://localhost:5000"))

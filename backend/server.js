const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');
const axios = require('axios')
require('dotenv').config()

//const cors = require('cors');

const app = express()
app.use(bodyParser.json())
app.use(cookieParser())
mongoose.connect(process.env.MONGOURL)

//app.get('/', (req, res) => res.send("hello, world!"))

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
    })
}

app.get('/checkjwt',verifyToken,(req,res)=>{ //Used for client side authentication
    res.status(200).send()
})

app.post('/signup',async (req,res)=>{
    try{
        const { username, password } = req.body;
        await signup(username, password);
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
})

app.post('/logout',(req,res)=>{
    res.clearCookie('jwtToken', { path: '/' });
    res.status(200).send()
})

app.listen(5000, () => console.log("Server listening on http://localhost:5000"))
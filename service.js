require('dotenv').config()

const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
app.use(express.json())


const users = [
    {
        username: "test1",
        password: "test1"
    },
    {
        username: "test2",
        password: "test2"
    }
]
app.get('/users',authenticate,(req,res)=>{
    res.json(users.filter(post => post.username===req.user.name))
}
)


function authenticate(req,res,next)
{
    const header = req.headers['authorization']
    const token = header && header.split(' ')[1]
    if(token==null)
    {
        return res.sendStatus(401)
    }
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>
    {
        if(err)
        {
            return res.sendStatus(403) 
        }
        req.user = user
        next()
    })
}



app.listen(7000)
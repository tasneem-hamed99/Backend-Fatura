require('dotenv').config()

const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
app.use(express.json())
const refreshToken= []

app.post('/refresh' , (req , res)=>{
   const refreshT= req.body.token
   if(refreshT == null)
   {
       return res.sendStatus(401)
   }
   if(!refreshToken.includes(refreshT))
   {
    return res.sendStatus(403)

   }
   jwt.verify(refreshT,process.env.REFRESH_TOKEN,(err,user)=>
   {
       if (err)
       {
           return res.sendStatus(403)
       }
       const access= genTokens({name: user.name})
       res.json({access:access})

   })
})

app.post('/login',(req,res)=>{
    const username = req.body.username
    const user = {name:username}
    const token = genTokens(user)
    const refresh = jwt.sign(user, process.env.REFRESH_TOKEN)
    refreshToken.push(refresh)
    res.json({token:token, refresh:refresh})
     
})

app.delete('/logout',(req,res)=>{
    refreshToken= refreshToken.filter(token => token !== req.body.token)
    res.sendStatus(204)
})
function genTokens(user)
{
    return jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{ expiresIn:'50s'}) // sesseion expiration time is usually longer for production code, ranging from (20-30 mins) but i used short time for testing purposes
}



app.listen(9000)
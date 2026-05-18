const express=require("express")
const cors=require("cors")
const mongoose=require("mongoose")

require("dotenv").config()

const userRoutes=
require("./routes/userRoutes")

const interviewRoutes=
require("./routes/interviewRoutes")

const app=express()

app.use(cors())

app.use(express.json())

mongoose.connect(

process.env.MONGO_URI

)

.then(()=>{

console.log(
"Database connected"
)

})

.catch((error)=>{

console.log(error)

})

app.use(
"/api/users",
userRoutes
)

app.use(
"/api/interviews",
interviewRoutes
)

app.get("/",(req,res)=>{

res.send(
"Server running"
)

})

const PORT=

process.env.PORT || 5000

app.listen(PORT,()=>{

console.log(

`Server running on port ${PORT}`

)

})
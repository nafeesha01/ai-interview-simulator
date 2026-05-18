const jwt=require("jsonwebtoken")

function auth(req,res,next){

try{

const token=
req.headers.authorization

if(!token){

return res.status(401).json({

message:"No token"

})

}

const verified=

jwt.verify(

token,
process.env.JWT_SECRET

)

req.user=verified

next()

}

catch(error){

res.status(401).json({

message:"Invalid token"

})

}

}

module.exports=auth
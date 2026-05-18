const express=require("express")

const router=express.Router()

const Interview=
require("../models/Interview")

const auth=
require("../middleware/authMiddleware")



router.post(

"/save",

auth,

async(req,res)=>{

try{

const {

role,
answers,
score

}=req.body


const newInterview=

new Interview({

userId:
req.user.id,

role,
answers,
score

})

await newInterview.save()

res.json({

message:
"Interview saved"

})

}

catch(error){

console.log(error)

res.status(500).json({

message:
"Save failed"

})

}

})





router.get(

"/history",

auth,

async(req,res)=>{

try{

const data=

await Interview.find({

userId:
req.user.id

})

res.json(data)

}

catch(error){

res.status(500).json({

message:
"Error"

})

}

})

module.exports=router
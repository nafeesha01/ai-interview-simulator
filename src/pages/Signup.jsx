import { useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../services/api"

function Signup() {

const navigate = useNavigate()

const [name,setName]=useState("")
const [email,setEmail]=useState("")
const [password,setPassword]=useState("")

const handleSignup=async()=>{

try{

await API.post(

"/users/signup",

{

name,
email,
password

}

)

alert("Signup Successful")

navigate("/")

}

catch(error){

console.log(error)

alert("Signup Failed")

}

}

return(

<div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-black via-gray-900 to-blue-950 px-4">

<div className="w-full max-w-md bg-gray-900/80 backdrop-blur-lg border border-gray-700 rounded-2xl p-8 shadow-2xl">

<h1 className="text-3xl font-bold text-white text-center mb-8">

Sign Up

</h1>

<input

type="text"
placeholder="Enter Name"

value={name}

onChange={(e)=>
setName(e.target.value)
}

className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600 outline-none mb-4"
/>

<input

type="email"
placeholder="Enter Email"

value={email}

onChange={(e)=>
setEmail(e.target.value)
}

className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600 outline-none mb-4"
/>

<input

type="password"
placeholder="Enter Password"

value={password}

onChange={(e)=>
setPassword(e.target.value)
}

className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600 outline-none mb-6"
/>

<button

onClick={handleSignup}

className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-lg font-semibold"

>

Sign Up

</button>

<div className="mt-6 text-center">

<p className="text-gray-400">

Already have an account?{" "}

<span

onClick={()=>
navigate("/")
}

className="text-blue-400 font-semibold cursor-pointer hover:text-blue-300"

>

Login

</span>

</p>

</div>

</div>

</div>

)

}

export default Signup
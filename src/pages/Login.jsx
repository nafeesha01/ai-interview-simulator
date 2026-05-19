import { useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../services/api"

function Login() {

const navigate = useNavigate()

const [email, setEmail] = useState("")
const [password, setPassword] = useState("")

const handleLogin = async () => {

try {

const response = await API.post(
"/users/login",
{
email,
password
}
)

localStorage.setItem(
"token",
response.data.token
)

navigate("/dashboard")

}

catch(error){

console.log(error)

alert("Login failed")

}

}

return (

<div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-black via-gray-900 to-blue-950 px-4">

<div className="w-full max-w-md bg-gray-900/80 backdrop-blur-lg border border-gray-700 rounded-2xl p-8 shadow-2xl">

<h1 className="text-3xl font-bold text-white text-center mb-8">

Login

</h1>

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

onClick={handleLogin}

className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-lg font-semibold"

>

Login

</button>

<div className="mt-6 text-center">

<p className="text-gray-400">

New here?{" "}

<span

onClick={()=>
navigate("/signup")
}

className="text-blue-400 font-semibold cursor-pointer hover:text-blue-300"

>

Sign Up

</span>

</p>

</div>

</div>

</div>

)

}

export default Login
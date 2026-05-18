import { useNavigate } from "react-router-dom"

function Navbar(){

const navigate=useNavigate()

function logout(){

localStorage.removeItem(
"token"
)

navigate("/login")

}

return(

<nav className="mx-10 mt-6">

<div className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-3xl px-8 py-5 flex justify-between items-center">

<div>

<h1 className="text-3xl font-bold">

AI Interview Pro

</h1>

<p className="text-gray-300 text-sm">

Next generation interview practice

</p>

</div>

<button

onClick={logout}

className="bg-white/10 border border-white/20 px-6 py-3 rounded-2xl hover:bg-red-500 transition duration-300"

>

Logout

</button>

</div>

</nav>

)

}

export default Navbar
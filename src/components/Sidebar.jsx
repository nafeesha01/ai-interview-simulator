import { Link, useLocation } from "react-router-dom"

import {
FaHome,
FaChartBar,
FaUserGraduate,
FaSignOutAlt
}
from "react-icons/fa"

function Sidebar(){

const location=
useLocation()

function logout(){

localStorage.removeItem(
"token"
)

window.location="/login"

}

const menu=[

{
name:"Home",
path:"/",
icon:<FaHome/>
},

{
name:"Interview",
path:"/interview",
icon:<FaUserGraduate/>
},

{
name:"Dashboard",
path:"/dashboard",
icon:<FaChartBar/>
}

]

return(

<div className="fixed left-0 top-0 h-screen w-[280px] bg-black/20 backdrop-blur-xl border-r border-white/10 p-8">

<div className="flex flex-col items-center">

<div className="w-24 h-24 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center text-4xl">

👤

</div>

<h2 className="mt-5 text-xl font-bold">

AI Interview Pro

</h2>

<p className="text-gray-400">

Welcome back

</p>

</div>

<div className="mt-14 flex flex-col gap-5">

{

menu.map(

(item,index)=>(

<Link

key={index}

to={item.path}

className={`

flex
items-center
gap-4
p-4
rounded-2xl
transition

${

location.pathname===item.path

?

"bg-gradient-to-r from-cyan-500 to-purple-600"

:

"hover:bg-white/10"

}

`}

>

{item.icon}

{item.name}

</Link>

)

)

}

<button

onClick={logout}

className="bg-red-500 p-4 rounded-2xl mt-10 flex items-center gap-4"

>

<FaSignOutAlt/>

Logout

</button>

</div>

</div>

)

}

export default Sidebar
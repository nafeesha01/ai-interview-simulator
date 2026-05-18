import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import RoleCard from "../components/RoleCard"
import ResumeUpload from "../components/ResumeUpload"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

import toast from "react-hot-toast"

function Home(){

const navigate=useNavigate()

const [selectedRole,setSelectedRole]=
useState("")

const [search,setSearch]=
useState("")

const [selectedCategory,
setSelectedCategory]=
useState("All")

const roles=[

{
title:"Software Developer",
description:"React • Node • DSA",
category:"Tech"
},

{
title:"Frontend Developer",
description:"HTML • CSS • React",
category:"Tech"
},

{
title:"Backend Developer",
description:"Node • APIs",
category:"Tech"
},

{
title:"Full Stack Developer",
description:"Frontend • Backend",
category:"Tech"
},

{
title:"Data Scientist",
description:"ML • AI",
category:"Tech"
},

{
title:"Mechanical Engineer",
description:"Core • Technical",
category:"Engineering"
},

{
title:"Civil Engineer",
description:"Structures",
category:"Engineering"
},

{
title:"Chemical Engineer",
description:"Industry",
category:"Engineering"
},

{
title:"Doctor",
description:"Medical",
category:"Medical"
},

{
title:"Lawyer",
description:"Legal",
category:"Business"
}

]

const categories=[

"All",
"Tech",
"Engineering",
"Medical",
"Business"

]

const filteredRoles=

roles.filter(role=>{

const searchMatch=

role.title
.toLowerCase()
.includes(
search.toLowerCase()
)

const categoryMatch=

selectedCategory==="All"

||

role.category===
selectedCategory

return searchMatch &&
categoryMatch

})

function startInterview(){

if(!selectedRole){

toast.error(
"Please select a role"
)

return

}

navigate(

"/interview",

{

state:{

role:selectedRole

}

}

)

}

return(

<div className="pb-20">

<Navbar/>

<Hero/>

<div className="px-10 mt-20">

<input

type="text"

placeholder="Search role..."

value={search}

onChange={(e)=>

setSearch(
e.target.value
)

}

className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 outline-none"

/>

<div className="flex gap-4 mt-8 flex-wrap">

{

categories.map(

(category,index)=>(

<button

key={index}

onClick={()=>

setSelectedCategory(
category
)

}

className={`

px-6 py-3 rounded-full

${

selectedCategory===category

?

"bg-gradient-to-r from-cyan-500 to-purple-600"

:

"bg-white/10"

}

`}

>

{category}

</button>

)

)

}

</div>

<div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8 mt-12">

{

filteredRoles.map(

(role,index)=>(

<RoleCard

key={index}

title={role.title}

description={role.description}

selected={
selectedRole===role.title
}

onClick={()=>

setSelectedRole(
role.title
)

}

/>

)

)

}

</div>

</div>

<div className="flex justify-center mt-16">

<button

onClick={startInterview}

className="px-10 py-5 rounded-full font-bold text-lg bg-gradient-to-r from-cyan-500 to-purple-600 hover:scale-105 transition"

>

Start AI Interview →

</button>

</div>

<ResumeUpload/>

</div>

)

}

export default Home
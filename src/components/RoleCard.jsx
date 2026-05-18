import { motion }
from "framer-motion"

function RoleCard({

title,
description,
selected,
onClick

}){

return(

<motion.div

initial={{

opacity:0,
y:30

}}

animate={{

opacity:1,
y:0

}}

whileHover={{

scale:1.05

}}

transition={{

duration:0.4

}}

onClick={onClick}

className={`

cursor-pointer
w-[320px]
rounded-[30px]
p-8
backdrop-blur-xl
border

${

selected

?

"bg-gradient-to-r from-cyan-500 to-purple-600"

:

"bg-white/10 border-white/10"

}

`}

>

<h2 className="text-2xl font-bold">

{title}

</h2>

<p className="mt-4 text-gray-300">

{description}

</p>

</motion.div>

)

}

export default RoleCard
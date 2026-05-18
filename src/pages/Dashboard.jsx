import { useEffect,useState } from "react"

import Sidebar from "../components/Sidebar"
import AICoach from "../components/AICoach"

import API from "../services/api"

import {

Chart as ChartJS,
CategoryScale,
LinearScale,
PointElement,
LineElement,
Title,
Tooltip,
Legend

} from "chart.js"

import { Line }
from "react-chartjs-2"

ChartJS.register(

CategoryScale,
LinearScale,
PointElement,
LineElement,
Title,
Tooltip,
Legend

)

function Dashboard(){

const [interviews,setInterviews]=
useState([])

const [stats,setStats]=
useState({

total:0,
average:0,
latest:0,
streak:0

})

useEffect(()=>{

loadData()

},[])

async function loadData(){

try{

const response=

await API.get(
"/interviews/history"
)

const data=
response.data

setInterviews(data)

const total=
data.length

const average=

total>0

?

Math.round(

data.reduce(

(sum,item)=>

sum+
(item.overallScore||0)

,0

)

/

total

)

:0

const latest=

total>0

?

data[
data.length-1
]
.overallScore||0

:0


let streak=0

for(

let i=
data.length-1;

i>=0;

i--

){

if(

(data[i]
.overallScore||0)

>=70

){

streak++

}

else{

break

}

}

setStats({

total,
average,
latest,
streak

})

}

catch(error){

console.log(error)

}

}

const chartData={

labels:

interviews.map(

(_,index)=>

`Interview ${index+1}`

),

datasets:[

{

label:"Score",

data:

interviews.map(

(item)=>

item.overallScore||0

),

borderWidth:3

}

]

}


function getLevel(){

if(
stats.average>=90
){

return "Expert 🚀"

}

if(
stats.average>=75
){

return "Advanced 🔥"

}

if(
stats.average>=50
){

return "Intermediate ⭐"

}

return "Beginner"

}

return(

<div>

<Sidebar/>

<div className="ml-[320px] p-10 flex gap-8">

<div className="w-[75%]">

<div className="bg-white/10 backdrop-blur-xl rounded-[35px] p-8 flex justify-between items-center">

<div>

<h1 className="text-4xl font-bold">

Welcome Back 👋

</h1>

<p className="text-gray-400 mt-3">

Continue improving your interview skills

</p>

</div>

<div className="flex gap-5">

<div className="bg-orange-500/20 p-5 rounded-2xl">

🔥 Streak:

{stats.streak}

</div>

<div className="bg-green-500/20 p-5 rounded-2xl">

{getLevel()}

</div>

</div>

</div>



<div className="grid grid-cols-3 gap-8 mt-10">

<div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl">

<h2 className="text-gray-400">

Total Interviews

</h2>

<p className="text-4xl font-bold mt-3">

{stats.total}

</p>

</div>


<div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl">

<h2 className="text-gray-400">

Average Score

</h2>

<p className="text-4xl font-bold mt-3">

{stats.average}

</p>

</div>


<div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl">

<h2 className="text-gray-400">

Latest Score

</h2>

<p className="text-4xl font-bold mt-3">

{stats.latest}

</p>

</div>

</div>



<div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 mt-10">

<h2 className="text-2xl font-bold">

Performance Trend

</h2>

<div className="mt-8">

<Line data={chartData}/>

</div>

</div>



<div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 mt-10">

<h2 className="text-2xl font-bold">

Recent Interviews

</h2>

{

interviews.map(

(interview,index)=>(

<div

key={index}

className="border-b border-white/10 py-5"

>

<p>

<b>Role:</b>

{interview.role}

</p>

<p>

<b>Score:</b>

{interview.overallScore}

</p>

</div>

)

)

}

</div>

</div>



<div className="w-[25%] sticky top-10 h-fit">

<AICoach

averageScore={stats.average}

latestScore={stats.latest}

/>

</div>

</div>

</div>

)

}

export default Dashboard
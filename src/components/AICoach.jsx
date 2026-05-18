function AICoach({

averageScore=0,
latestScore=0

}){

function getStrength(){

if(averageScore>=85){

return "Strong communication and technical understanding"

}

if(averageScore>=70){

return "Good interview structure and clarity"

}

return "Shows effort and consistency"

}


function getWeakness(){

if(latestScore<50){

return "Technical explanations need more depth"

}

if(latestScore<75){

return "Improve confidence and examples"

}

return "Minor improvements needed"

}


function getSuggestions(){

if(latestScore<50){

return [

"Practice DSA basics",
"Work on React fundamentals",
"Try mock interviews"

]

}

if(latestScore<75){

return [

"Improve project explanations",
"Use real examples",
"Practice HR questions"

]

}

return [

"Practice advanced topics",
"Improve speed",
"Keep consistency"

]

}

return(

<div className="bg-white/10 backdrop-blur-xl rounded-[30px] p-6">

<h2 className="text-2xl font-bold">

🤖 AI Coach

</h2>


<div className="bg-green-500/20 rounded-2xl p-4 mt-6">

<h3 className="font-bold">

Strength

</h3>

<p className="mt-2 text-gray-300">

{getStrength()}

</p>

</div>


<div className="bg-red-500/20 rounded-2xl p-4 mt-5">

<h3 className="font-bold">

Focus Area

</h3>

<p className="mt-2 text-gray-300">

{getWeakness()}

</p>

</div>


<div className="bg-cyan-500/20 rounded-2xl p-4 mt-5">

<h3 className="font-bold">

Suggested Practice

</h3>

<div className="mt-2 text-gray-300">

{

getSuggestions().map(

(item,index)=>(

<p key={index}>

• {item}

</p>

)

)

}

</div>

</div>

</div>

)

}

export default AICoach
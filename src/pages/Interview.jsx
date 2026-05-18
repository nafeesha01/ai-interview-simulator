import { useLocation,useNavigate } from "react-router-dom"

import {
useEffect,
useState,
useRef
}
from "react"

import API
from "../services/api"

import {
generateQuestions,
evaluateAnswers
}
from "../services/aiService"

import {
FaMicrophone
}
from "react-icons/fa"

import toast
from "react-hot-toast"

function Interview(){

const location=
useLocation()

const navigate=
useNavigate()

const recognitionRef=
useRef(null)

const role=

location.state?.role

||

"Software Developer"

const [questions,
setQuestions]
=
useState([])

const [loading,
setLoading]
=
useState(true)

const [currentQuestion,
setCurrentQuestion]
=
useState(0)

const [answer,
setAnswer]
=
useState("")

const [allAnswers,
setAllAnswers]
=
useState([])

const [isListening,
setIsListening]
=
useState(false)


useEffect(()=>{

loadQuestions()

},[])


async function loadQuestions(){

const result=

await generateQuestions(
role
)

const questionArray=

result
.split("\n")
.filter(
q=>q.trim()!==""
)

setQuestions(
questionArray
)

setLoading(false)

}


function startVoice(){

const SpeechRecognition=

window.SpeechRecognition

||

window.webkitSpeechRecognition


if(
!SpeechRecognition
){

toast.error(

"Speech not supported. Use Chrome"

)

return

}


if(
!recognitionRef.current
){

recognitionRef.current=

new SpeechRecognition()

recognitionRef.current.lang=
"en-US"

recognitionRef.current.continuous=
false

recognitionRef.current.onstart=
()=>{

setIsListening(
true
)

}

recognitionRef.current.onend=
()=>{

setIsListening(
false
)

}

recognitionRef.current.onresult=
(event)=>{

const speechText=

event.results[0][0]
.transcript

setAnswer(

(prev)=>

prev+" "+speechText

)

}

}

recognitionRef.current.start()

}



async function nextQuestion(){

if(
answer.trim()===""
){

toast.error(
"Please answer"
)

return

}

const updatedAnswers=[

...allAnswers,
answer

]

setAllAnswers(
updatedAnswers
)

setAnswer("")


if(

currentQuestion<
questions.length-1

){

setCurrentQuestion(

currentQuestion+1

)

}

else{

try{

const aiResult=

await evaluateAnswers(
updatedAnswers
)

await API.post(

"/interviews/save",

{

role,

answers:
updatedAnswers,

communicationScore:
aiResult.communicationScore,

technicalScore:
aiResult.technicalScore,

confidenceScore:
aiResult.confidenceScore,

overallScore:
aiResult.overallScore,

feedback:
aiResult.feedback

}

)

toast.success(

"Interview completed"

)

navigate(
"/dashboard"
)

}

catch(error){

console.log(error)

toast.error(
"Something went wrong"
)

}

}

}

return(

<div className="min-h-screen p-10">

<h1 className="text-5xl font-bold">

AI Interview Session

</h1>

<p className="text-gray-400 mt-2">

Role:

{role}

</p>

{

loading

?

<div className="mt-10">

Loading...

</div>

:

<div className="bg-white/10 backdrop-blur-xl rounded-[30px] p-10 mt-10">

<h2 className="text-2xl font-bold">

{

questions[
currentQuestion
]

}

</h2>

<textarea

value={answer}

onChange={(e)=>

setAnswer(
e.target.value
)

}

placeholder="Type answer..."

className="w-full h-[180px] rounded-2xl mt-8 p-5 bg-black/20 border border-white/10 outline-none"

/>

<div className="flex gap-5 mt-8">

<button

onClick={startVoice}

className={`

px-6
py-4
rounded-2xl

${

isListening

?

"bg-red-500"

:

"bg-purple-600"

}

`}

>

<FaMicrophone/>

</button>

<button

onClick={nextQuestion}

className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600"

>

{

currentQuestion===
questions.length-1

?

"Finish"

:

"Next"

}

</button>

</div>

</div>

}

</div>

)

}

export default Interview
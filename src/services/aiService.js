import axios from "axios"

const API_KEY=
import.meta.env
.VITE_OPENROUTER_API_KEY


export async function generateQuestions(role){

try{

const response=
await axios.post(

"https://openrouter.ai/api/v1/chat/completions",

{

model:"openai/gpt-4o-mini",

messages:[

{

role:"user",

content:

`Generate 5 interview questions for ${role}.
Return only questions.`

}

]

},

{

headers:{

Authorization:
`Bearer ${API_KEY}`,

"Content-Type":
"application/json"

}

}

)

return response.data
.choices[0]
.message.content

}

catch(error){

console.log(error)

}

}



export async function evaluateAnswers(
answers
){

try{

const response=
await axios.post(

"https://openrouter.ai/api/v1/chat/completions",

{

model:"openai/gpt-4o-mini",

messages:[

{

role:"user",

content:

`

Evaluate these answers:

${answers.join("\n")}

Return ONLY valid JSON:

{
"communicationScore":80,
"technicalScore":75,
"confidenceScore":82,
"overallScore":79,
"feedback":"short feedback"
}

`

}

]

},

{

headers:{

Authorization:
`Bearer ${API_KEY}`,

"Content-Type":
"application/json"

}

}

)

return JSON.parse(

response.data
.choices[0]
.message.content

)

}

catch(error){

console.log(error)

}

}
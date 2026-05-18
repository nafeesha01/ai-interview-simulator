import { useState } from "react"

import {
extractResumeText
}
from "../services/resumeService"

import toast from "react-hot-toast"

function ResumeUpload(){

const [resumeName,
setResumeName]=
useState(
"No file selected"
)

async function handleUpload(e){

const file=
e.target.files[0]

if(!file)return

setResumeName(
file.name
)

try{

const text=

await extractResumeText(
file
)

localStorage.setItem(

"resume",
text

)

toast.success(

"Resume uploaded"

)

}

catch(error){

console.log(error)

toast.error(

"Error reading PDF"

)

}

}

return(

<div className="flex justify-center mt-20">

<div className="w-[700px] rounded-[35px] p-8 backdrop-blur-xl bg-white/10 border border-white/10">

<h2 className="text-3xl font-bold">

📄 Upload Resume

</h2>

<p className="mt-3 text-gray-300">

Upload your resume PDF

</p>

<div className="mt-8 flex flex-col items-center">

<label

className="bg-gradient-to-r from-cyan-500 to-purple-600 px-8 py-4 rounded-full cursor-pointer"

>

Choose Resume

<input

type="file"

accept=".pdf"

onChange={handleUpload}

className="hidden"

/>

</label>

<p className="mt-6 text-gray-300">

{resumeName}

</p>

</div>

</div>

</div>

)

}

export default ResumeUpload
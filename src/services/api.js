import axios from "axios"

const API=axios.create({

baseURL:
"https://ai-interview-simulator-8yzx.onrender.com/api"

})

API.interceptors.request.use(

(config)=>{

const token=

localStorage.getItem(
"token"
)

if(token){

config.headers.Authorization=
token

}

return config

}

)

export default API
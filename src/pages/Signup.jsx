import { useState } from "react"
import { useNavigate } from "react-router-dom"

import API from "../services/api"

function Signup() {

  const navigate = useNavigate()

  const [email, setEmail] =
    useState("")

  const [password, setPassword] =
    useState("")

  async function handleSignup() {

    try {

      const response =
        await API.post(

          "/users/signup",

          {
            email,
            password
          }

        )

      alert(
        response.data.message
      )

      navigate("/login")

    }

    catch(error){

      console.log(error)

      alert(
        "Signup failed"
      )

    }

  }

  return (

    <div className="min-h-screen flex justify-center items-center">

      <div className="border p-8 rounded-xl w-[400px]">

        <h1 className="text-3xl font-bold">

          Signup

        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>
            setEmail(e.target.value)
          }
          className="border p-3 rounded-lg w-full mt-6"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>
            setPassword(e.target.value)
          }
          className="border p-3 rounded-lg w-full mt-4"
        />

        <button
          onClick={handleSignup}
          className="bg-green-600 text-white w-full p-3 rounded-lg mt-6"
        >

          Signup

        </button>

      </div>

    </div>

  )

}

export default Signup
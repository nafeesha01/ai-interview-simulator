import { useState } from "react"
import { useNavigate } from "react-router-dom"

import API from "../services/api"

function Login() {

  const navigate = useNavigate()

  const [email, setEmail] =
    useState("")

  const [password, setPassword] =
    useState("")

  async function handleLogin() {

    try {

      const response =
        await API.post(

          "/users/login",

          {
            email,
            password
          }

        )

      localStorage.setItem(

        "token",
        response.data.token

      )

      alert(
        response.data.message
      )

      navigate("/")

    }

    catch(error){

      alert(

        error.response?.data?.message ||

        "Login failed"

      )

    }

  }

  return (

    <div className="min-h-screen flex justify-center items-center">

      <div className="border p-8 rounded-xl w-[400px] shadow-lg">

        <h1 className="text-3xl font-bold text-center">

          Login

        </h1>

        <input

          type="email"

          placeholder="Enter Email"

          value={email}

          onChange={(e)=>

            setEmail(
              e.target.value
            )

          }

          className="border p-3 rounded-lg w-full mt-6"

        />

        <input

          type="password"

          placeholder="Enter Password"

          value={password}

          onChange={(e)=>

            setPassword(
              e.target.value
            )

          }

          className="border p-3 rounded-lg w-full mt-4"

        />

        <button

          onClick={handleLogin}

          className="bg-blue-600 text-white p-3 rounded-lg w-full mt-6"

        >

          Login

        </button>

      </div>

    </div>

  )

}

export default Login
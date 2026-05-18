import {BrowserRouter,Routes,Route}
from "react-router-dom"

import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Interview from "./pages/Interview"
import Dashboard from "./pages/Dashboard"

import ProtectedRoute
from "./components/ProtectedRoute"

function App(){

return(

<BrowserRouter>

<Routes>

<Route
path="/login"
element={<Login/>}
/>

<Route
path="/signup"
element={<Signup/>}
/>

<Route
path="/"
element={
<ProtectedRoute>

<Home/>

</ProtectedRoute>
}
/>

<Route
path="/interview"
element={

<ProtectedRoute>

<Interview/>

</ProtectedRoute>

}
/>

<Route
path="/dashboard"
element={

<ProtectedRoute>

<Dashboard/>

</ProtectedRoute>

}
/>

</Routes>

</BrowserRouter>

)

}

export default App
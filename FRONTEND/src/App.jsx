import Login from"./pages/login/Login"
import './App.css'
import SignUp from "./pages/signup/Signup"
import Home from "./pages/home/Home"
import {Navigate, Route ,Routes} from "react-router-dom"
import {Toaster} from "react-hot-toast"
import { useAuthContext } from "./context/AuthContext"
function App() {
  const {authUser} =useAuthContext();
  return (
    <div className='p-4 h-screen flex items-center justify-center'>
      <Routes>

      <Route path ="/" element ={authUser? <Home></Home>: <Navigate to ={"/login"}></Navigate>}></Route>
      <Route path ="/login" element ={authUser? <Navigate to ="/"/>: <Login></Login>}></Route>
      <Route path ="/signup" element ={authUser? <Navigate to ="/"/>: <SignUp></SignUp>}></Route>



      </Routes>
      <Toaster></Toaster>
  
        
          </div>
  )
}

export default App

import React from "react"
import{
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"
import Login from "./pages/Auth/Login"
import SignUp from "./pages/Auth/SignUp"
import Home from "./pages/Dashboard/Home"
import Income from "./pages/Dashboard/Income"
import Expense from "./pages/Dashboard/Expense"
import UserProvider from "./context/UserContext"
import ProfileEdit from "./pages/User/ProfileEdit"
import {Toaster} from 'react-hot-toast'
import moment from 'moment'
import 'moment/locale/pt-br'

moment.locale('pt-br')

const App = () => {
  return (
    <UserProvider>
      <div className="">
        <Router>
          <Routes>
            <Route path="/" element={<Root/>}/>
            <Route path="/login" exact element={<Login/>}/>
            <Route path="/profile" exact element={<ProfileEdit/>}/>
            <Route path="/signUp" exact element={<SignUp/>}/>
            <Route path="/dashboard" exact element={<Home/>}/>
            <Route path="/income" exact element={<Income/>}/>
            <Route path="/expense" exact element={<Expense/>}/>
          </Routes>
        </Router>
      </div>

      <Toaster
        toastOptions={{
          className:"",
          style:{
            fontSize:"13px"
          }
        }}
      />
    </UserProvider>
  )
}

export default App

const Root = () => {
  const isAuthenticated = !!localStorage.getItem("token")
  return isAuthenticated ? (
    <Navigate to="/dashboard"/>
  ) : (
    <Navigate to="/login"/>
  )
}
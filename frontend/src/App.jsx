import { Button } from "@/components/ui/button"
import Login from "./pages/login"
import DelaysEntry from "./pages/delaysEntry";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/ui/Navbar";
import { useAuthStore } from "./store/useAuthStore.js";
import { useEffect } from "react";
import {Loader} from "lucide-react";
import HomePage from "./pages/homePage.jsx";
import { Toaster } from 'react-hot-toast';
import Analysis from "./pages/analysis.jsx";
import AnalysisByHours from "./pages/analysisByHours.jsx";


function App() {
  const {authUser,checkAuth,isCheckingAuth}=useAuthStore()
useEffect(()=>{
  checkAuth()
},[checkAuth])
console.log(authUser)
if(isCheckingAuth && !authUser) return (

  <div className="flex items-center justify-center h-screen">
    <Loader className="size-10 animate-spin"/>
  </div>
)
  return (
    <div >
    <Navbar/>
    <div className="flex min-h-svh flex-col items-center justify-center">
      <Routes>
        <Route path="/" element ={authUser ? <HomePage />:<Navigate to="/login"/>} />
        
        <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/"/>} />
        <Route path="/delays" element={authUser ? <DelaysEntry /> : <Navigate to="/login"/>} />
        <Route path="/analysis-count" element={authUser ? <Analysis/> :<Navigate to="/login" />} />
        <Route path="/analysis-hours" element={authUser ? <AnalysisByHours/> : <Navigate to="/login" />} />
      </Routes>
    </div>
    <Toaster position="top-right" reverseOrder={false} />
    </div>
  )
}

export default App
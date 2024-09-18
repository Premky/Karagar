import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Header from './Components/Header/Header'
import Footer from './Components/Header/Footer'
import Home from './Components/Client/Home'
// import NoticeBoard from './Components/Client/NoticeBoard'
import Contact from './Components/Client/Contact'
import Feedback from './Components/Client/Feedback'
import Mediacenter from './Components/Client/Mediacenter'
import Notice_Bolpatra from './Components/Client/Notice_Bolpatra'
import Navbar from './Components/Header/Navbar'
import AdminNavbar from './Components/Admin/AdminNavbar'
import Employee from './Components/Admin/Employee'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Navbar/>}/>
          <Route path="/admin/" element={<AdminNavbar/>}/>
        </Routes>
      </BrowserRouter>
      {/* <Home/> */}
      {/* <NoticeBoard/> */}
      {/* <Contact/> */}
      {/* <Feedback/> */}
      {/* <Mediacenter/> */}

      

      <Footer />
    </>
  )
}

export default App
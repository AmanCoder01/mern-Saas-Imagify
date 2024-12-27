import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import BuyCredit from './pages/BuyCredit'
import Result from './pages/Result'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './components/Login'
import { AppContext } from './context/AppContext'
import Spinner from './components/Spinner'
import VerifyEmail from './pages/VerifyEmail'

const App = () => {
  const { appLoading, showLogin } = useContext(AppContext);

  if (appLoading) {
    return (
      <div className='  flex justify-center items-center h-screen'>
        <div className='w-14 h-14'>
          <Spinner />
        </div>
      </div>
    )
  }

  return (
    <div className='px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-teal-50 to-orange-50'>
      <Navbar />
      {showLogin && <Login />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<BuyCredit />} />
        <Route path="/result" element={<Result />} />
        <Route path="/verify-email/:resetToken" element={<VerifyEmail />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App

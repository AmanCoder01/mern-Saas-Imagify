import React, { useContext, useState } from 'react'
import { assets } from "../assets/assets"
import { Link, useNavigate } from 'react-router-dom'
import { FaRegUser } from "react-icons/fa";
import { AppContext } from '../context/AppContext';
import toast from "react-hot-toast"


const Navbar = () => {

    const { user, setShowLogin, showLogin, setImages, setToken, setUser } = useContext(AppContext);
    const navigate = useNavigate();



    const logoutHandler = () => {
        localStorage.removeItem('token');
        setUser(null);
        setToken('');
        setImages([]);
        toast.success("Logout successfully")
    }

    return (
        <div className='flex items-center justify-between py-5'>
            <Link to="/">
                <img src={assets.logo} alt=""
                    className='w-28 sm:w-32 lg:w-40' />
            </Link>


            <div className='flex items-center'>
                <Link to="/posts" className='mr-6 hidden max-sm:hidden'>Posts</Link>
                {
                    user ? (
                        <div className='flex items-center gap-2 sm:gap-4'>

                            <button onClick={() => navigate("/pricing")} className='flex items-center gap-2 bg-blue-100 rounded-full px-4 sm:px-6 py-1.5 sm:py-3 hover:scale-105 transition-all duration-700'>
                                <img src={assets.credit_star} className='w-5' alt="" />
                                <p className='text-xs sm:text-sm font-medium text-gray-600'>Credit Left : {user.credits}</p>
                            </button>


                            <p className='text-gray-600 max-sm:hidden pl-4'>Hi, {user.name}</p>
                            <div className='relative group'>
                                <FaRegUser size={20} className='drop-shadow cursor-pointer' />

                                <div className='absolute hidden group-hover:block  top-0 right-0 z-10 text-black rounded pt-10'>
                                    <ul className='list-none m-0 p-2 bg-white rounded-md border font-semibold'>
                                        <li className='py-2 px-2 cursor-pointer'><Link to="/profile">Profile</Link></li>
                                        <li className='py-2 px-2 cursor-pointer'><Link to="/posts">Posts</Link></li>
                                        <li onClick={logoutHandler} className='py-2 px-2 cursor-pointer'><Link>Logout</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ) :
                        (
                            <div className='flex items-center gap-2 sm:gap-6 '>
                                <Link to="/pricing">
                                    <p className='cursor-pointer'>Pricing</p>
                                </Link>
                                <button onClick={() => setShowLogin(true)} className='bg-zinc-800 text-white px-7 py-2 sm:px-10 text-sm rounded-2xl'>Login</button>
                            </div>
                        )
                }
            </div>
        </div>
    )
}

export default Navbar

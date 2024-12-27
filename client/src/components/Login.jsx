import React, { useContext, useEffect, useState } from 'react'
import { FaRegUser } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import { motion } from "motion/react"
import axios from "axios"
import toast from 'react-hot-toast';
import Spinner from './Spinner';
import { MdMarkEmailRead } from "react-icons/md";


const Login = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    })
    const [loading, setLoading] = useState(false);
    const [forgotPassword, setForgotPassword] = useState(false);
    const [sendedPassword, setSendedPassword] = useState(false);

    const [state, setState] = useState("Login");
    const { setShowLogin, backendUrl, setToken, setUser } = useContext(AppContext);


    useEffect(() => {
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "unset";
        }
    }, [])


    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const sendResetPasswordHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data } = await axios.post(`${backendUrl}/user/send-reset`, {
                email: formData.email
            })

            if (data.success) {
                toast.success(data.message);
                setLoading(false);
                setSendedPassword(true);
            } else {
                setLoading(false);
                toast.error(data.message);
            }
        } catch (error) {
            setLoading(false);
            toast.error(error.response.data.message);
        }
    }


    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            if (state === "Login") {
                const { data } = await axios.post(`${backendUrl}/user/login`, {
                    email: formData.email,
                    password: formData.password
                })

                if (data.success) {
                    setToken(data.token);
                    setUser(data.user);
                    localStorage.setItem('token', data.token);
                    toast.success(data.message);
                    setShowLogin(false);
                    setLoading(false);
                } else {
                    setLoading(false);
                    toast.error(data.message);
                }

            } else {
                const { data } = await axios.post(`${backendUrl}/user/register`, formData);

                if (data.success) {
                    setToken(data.token);
                    setUser(data.user);
                    localStorage.setItem('token', data.token);
                    toast.success(data.message);
                    setShowLogin(false);
                    setLoading(false);
                } else {
                    setLoading(false);
                    toast.error(data.message);
                }
            }

        } catch (error) {
            console.log(error);
            setLoading(false);
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center '>


            {

                forgotPassword ? (
                    <motion.form onSubmit={sendResetPasswordHandler}
                        initial={{ opacity: 0.2, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3 }}
                        className='relative bg-white p-10 rounded-xl text-slate-500'>
                        <h1 className='text-center text-2xl font-medium text-neutral-700'>Forgot Password?</h1>
                        <p className='text-sm mt-1 mb-6'>Don't worry enter your email to get reset link  </p>
                        {sendedPassword ?
                            (
                                <div className='flex flex-col justify-center items-center'>
                                    <MdMarkEmailRead size={100} />
                                    <p className='mt-3'>Check Your Email {formData.email}</p>
                                </div>
                            ) :

                            (
                                <div className='flex items-center gap-2 rounded-full mt-4 px-6 py-2 border'>
                                    <MdOutlineEmail size={18} />
                                    <input
                                        name='email'
                                        value={formData.email}
                                        onChange={onChangeHandler}
                                        className='outline-none border-none'
                                        type="email" placeholder='Email' />
                                </div>
                            )}
                        {!sendedPassword && <button className='py-2 w-full rounded-full bg-blue-600 mt-6  text-white'>Send Reset Link</button>
                        }

                        {sendedPassword && <button disabled className='py-2 w-full rounded-full bg-blue-600 mt-6  text-white'>
                            {
                                loading ? <div className='flex items-center justify-center gap-3'>
                                    <div className='w-6 h-6'>
                                        <Spinner />
                                    </div>
                                    Sending...
                                </div> : "Send Reset Link"
                            }
                        </button>
                        }
                        <img onClick={() => setShowLogin(false)} src={assets.cross_icon} className='absolute top-5 right-5 cursor-pointer' alt="" />

                    </motion.form>
                ) :

                    (

                        <motion.form onSubmit={onSubmitHandler}
                            initial={{ opacity: 0.2, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3 }}
                            className='relative bg-white p-10 rounded-xl text-slate-500'>
                            <h1 className='text-center text-2xl font-medium text-neutral-700'>{state}</h1>
                            <p className='text-sm mt-1 mb-6'>Welcome back! Please sign in to continue  </p>

                            {state !== "Login" && <div className='flex items-center gap-2 rounded-full mt-4 px-6 py-2 border'>
                                <FaRegUser />
                                <input
                                    name='name'
                                    value={formData.user}
                                    onChange={onChangeHandler}
                                    className='outline-none border-none'
                                    type="text" placeholder='Full Name' />
                            </div>}

                            <div className='flex items-center gap-2 rounded-full mt-4 px-6 py-2 border'>
                                <MdOutlineEmail size={18} />
                                <input
                                    name='email'
                                    value={formData.email}
                                    onChange={onChangeHandler}
                                    className='outline-none border-none'
                                    type="email" placeholder='Email' />
                            </div>

                            <div className='flex items-center gap-2 rounded-full mt-4 px-6 py-2 border mb-4'>
                                <MdLockOutline size={18} />
                                <input
                                    name='password'
                                    value={formData.password}
                                    onChange={onChangeHandler}
                                    className='outline-none border-none'
                                    type="password" placeholder='Password' />
                            </div>
                            {state === "Login" &&
                                <p onClick={() => setForgotPassword(true)} className='text-sm text-blue-600  cursor-pointer mb-4'>Forgot Password?</p>}


                            <button className='py-2 w-full rounded-full bg-blue-600  text-white'>{
                                state === "Login" ? loading ? <div className='flex items-center justify-center gap-3'>
                                    <div className='w-6 h-6'>
                                        <Spinner />
                                    </div>
                                    Loging...
                                </div> : "Login" : loading ? <div className='flex items-center justify-center gap-3'>
                                    <div className='w-6 h-6'>
                                        <Spinner />
                                    </div>
                                    Creating...
                                </div> : "Create Account"}</button>
                            {state !== "Login" ?

                                <p className='mt-5 text-center'>Already have an account? <span className='text-blue-600 cursor-pointer' onClick={() => setState("Login")}>Login</span></p>

                                :
                                <p className='mt-5 text-center'>Don't have account already? <span className='text-blue-600 cursor-pointer' onClick={() => setState("SignUp")}>Sign Up</span></p>}

                            <img onClick={() => setShowLogin(false)} src={assets.cross_icon} className='absolute top-5 right-5 cursor-pointer' alt="" />
                        </motion.form>
                    )

            }

        </div >
    )
}

export default Login

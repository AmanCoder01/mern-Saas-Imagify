import React, { useContext } from 'react'
import { assets, plans } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { motion } from "motion/react"
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from "axios";

const BuyCredit = () => {

    const { user, token, fetchUser, backendUrl, setShowLogin } = useContext(AppContext);

    const navigate = useNavigate();


    const initPay = async (order) => {
        const options = {
            key: "rzp_test_C4fFzzYY3kKP4e",
            amount: order.amount,
            currency: order.currency,
            name: "Credits Payment",
            description: "Payment for credits",
            order_id: order.id,
            receipt: order.receipt,
            handler: async (response) => {
                try {
                    const { data } = await axios.post(`${backendUrl}/user/verify-pay`, response, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    if (data.success) {
                        fetchUser();
                        navigate("/");
                        toast.success(data.message);
                    } else {
                        toast.error(data.message);
                    }
                } catch (error) {
                    toast.error(error.message);
                }
            }
        }

        const rzp = new window.Razorpay(options);
        rzp.open();
    }


    const paymentRazorpay = async (planId) => {
        try {
            if (!user) {
                setShowLogin(true);
                return;
            }

            const { data } = await axios.post(`${backendUrl}/user/pay`, { planId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            if (data.success) {
                initPay(data.order);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0.2, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className='min-h-[80vh] text-center pt-14 mb-10'>
            <button className='border border-gray-400 px-10 py-2 rounded-full mb-6'>Our Plan</button>
            <h1 className='text-3xl font-medium mb-6 sm:mb-10'>Choose the plan</h1>

            <div className='flex items-center justify-center gap-6 flex-wrap text-left'>
                {
                    plans.map((item, index) => (
                        <div key={index} className='flex justify-center flex-col gap-3 bg-white drop-shadow-sm border rounded-lg py-12 px-8 text-gray-600 hover:scale-105 transition-all duration-500 '>
                            <img src={assets.logo_icon} width={40} alt="" />
                            <h2 className='font-semibold'>{item.id}</h2>
                            <p className='text-sm'>{item.desc}</p>
                            <p className='mt-3'>
                                <span className='text-3xl font-medium'> ${item.price}</span> / {item.credits} credits</p>

                            <button
                                onClick={() => paymentRazorpay(item.id)}
                                className='w-full mt-5 bg-gray-800 text-white text-sm rounded-md py-2.5 min-w-52'>
                                {
                                    user ? "Purchase" : "Get Started"
                                }
                            </button>
                        </div>
                    ))
                }
            </div>
        </motion.div>
    )
}

export default BuyCredit

import React, { useContext } from 'react'
import { FaStar } from "react-icons/fa";
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { motion } from "motion/react"
import { AppContext } from '../context/AppContext';


const Header = () => {

    const navigate = useNavigate();
    const { user, images, setShowLogin } = useContext(AppContext);

    const onclickHandler = () => {
        if (user) {
            navigate('/result')
        }
        else {
            setShowLogin(true);
        }
    }

    return (
        <motion.div className='flex flex-col justify-center items-center my-16'
            initial={{
                opacity: 0.2,
                y: 100
            }}
            transition={{
                duration: 1,
            }}
            whileInView={{
                opacity: 1,
                y: 0
            }}
            viewport={{
                once: true
            }}
        >
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                animate={{ opacity: 1, y: 0 }}
                className='text-stone-500 flex items-center bg-white px-6 py-1 rounded-full border border-neutral-500 gap-2 '>
                <p>Best text to image generator</p>
                <FaStar color='orange' />
            </motion.div>

            <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 2 }}
                className='text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] mx-auto text-center mt-10 '>Turn text to <span className='text-blue-600'>image</span>, in seconds.</motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className='mt-5 max-w-xl text-center mx-auto'>Unleash your creativity with AI. Turn your imagination into visual art in seconds – just type, and watch the magic happen.</motion.p>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ default: { duration: 0.5 }, opacity: { delay: 0.8, duration: 1 } }}
                onClick={onclickHandler} className='flex items-center gap-2 w-auto mt-8 bg-black text-white rounded-full py-2 sm:py-3 px-4 sm:px-7 '>
                Generate Images
                <img src={assets.star_group} className='h-6' alt="" />
            </motion.button>


            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className='flex items-center justify-center gap-3 mt-16'>
                {
                    images.length > 0 ?
                        images.slice(0, 6)?.map((item, index) => {
                            return <motion.img
                                whileHover={{ scale: 1.05, duration: 0.1 }}
                                src={item.imageUrl}
                                className='rounded-md hover:scale-105 transition-all duration-300 max-sm:w-10' width={70} key={index} alt="" />
                        }) :
                        Array(6).fill("").map((item, index) => {
                            return <motion.img
                                whileHover={{ scale: 1.05, duration: 0.1 }}
                                src={index % 2 == 0 ? assets.sample_img_1 : assets.sample_img_2}
                                className='rounded-md hover:scale-105 transition-all duration-300 max-sm:w-10' width={70} key={index} alt="" />
                        })
                }
            </motion.div>
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className='text-neutral-600 mt-2'>Generated images from imagify</motion.p>
        </motion.div>
    )
}

export default Header

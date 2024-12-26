import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom';
import { motion } from "motion/react"
import { AppContext } from '../context/AppContext';


const GenerateButton = () => {
    const navigate = useNavigate();
    const { user, setShowLogin } = useContext(AppContext);

    const onclickHandler = () => {
        if (user) {
            navigate('/result')
        }
        else {
            setShowLogin(true);
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0.2, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className='flex items-center flex-col justify-center pb-16'>
            <h1 className='text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold text-neutral-800 py-6 md:py-16'>See the magic. Try now</h1>

            <button onClick={onclickHandler} className='flex items-center gap-3 bg-black py-2 sm:py-3 px-4 sm:px-12 hover:scale-105 translate-all duration-500 text-white rounded-full'>
                Generate Images
                <img src={assets.star_group} className='h-6' alt="" />
            </button>
        </motion.div>
    )
}

export default GenerateButton

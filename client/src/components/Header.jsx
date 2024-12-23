import React from 'react'
import { FaStar } from "react-icons/fa";
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';


const Header = () => {

    const navigate = useNavigate();

    return (
        <div className='flex flex-col justify-center items-center my-20'>
            <div className='text-stone-500 flex items-center bg-white px-6 py-1 rounded-full border border-neutral-500 gap-2 '>
                <p>Best text to image generator</p>
                <FaStar color='orange' />
            </div>

            <h1 className='text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] mx-auto text-center mt-10 '>Turn text to <span className='text-blue-600'>image</span>, in seconds.</h1>

            <p className='mt-5 max-w-xl text-center mx-auto'>Unleash your creativity with AI. Turn your imagination into visual art in seconds – just type, and watch the magic happen.</p>

            <button onClick={() => navigate("/result")} className='flex items-center gap-2 w-auto mt-8 bg-black text-white rounded-full py-2 sm:py-3 px-4 sm:px-7 '>
                Generate Images
                <img src={assets.star_group} className='h-6' alt="" />
            </button>


            <div className='flex items-center justify-center gap-3 mt-16'>
                {
                    Array(6).fill("").map((item, index) => {
                        return <img src={index % 2 == 0 ? assets.sample_img_1 : assets.sample_img_2}
                            className='rounded-md hover:scale-105 transition-all duration-300 max-sm:w-10' width={70} key={index} alt="" />
                    })
                }
            </div>
            <p className='text-neutral-600 mt-2'>Generated images from imagify</p>
        </div>
    )
}

export default Header

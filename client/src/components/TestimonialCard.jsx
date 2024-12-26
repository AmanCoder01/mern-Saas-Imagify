import React from 'react'
import { assets } from '../assets/assets'

const TestimonialCard = ({ item }) => {
    return (
        <div className='bg-white/20 p-8 rounded-2xl shadow-md border max-w-80 cursor-pointer hover:scale-[1.02]  transition-all'>
            <div className='mx-auto flex flex-col items-center justify-center '>
                <img src={item.image} alt="" width={40} className='rounded-full' />
                <h1 className='text-xl font-semibold mt-3'>{item.name}</h1>
                <h1 className='text-gray-500 mb-4'>{item.role}</h1>

                <div className='flex mb-4'>
                    {
                        Array(item.stars).fill().map((item, index) => (
                            <img src={assets.rating_star} key={index} alt="" />
                        ))
                    }
                </div>
                <p className='text-center text-sm text-gray-600'>{item.text}</p>
            </div>
        </div>
    )
}

export default TestimonialCard

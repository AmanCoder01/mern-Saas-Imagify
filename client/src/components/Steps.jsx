import React from 'react'
import { stepsData } from '../assets/assets'

const Steps = () => {
    return (
        <div className='mx-auto my-20'>
            <div className='text-center'>
                <h1 className='text-3xl sm:text-4xl font-semibold'>How it works</h1>
                <p className='text-gray-600  mt-2 mb-8'>Transform Words Into Stunning Images</p>
            </div>

            <div className='flex flex-col justify-center space-y-4 max-w-3xl text-sm mx-auto'>
                {
                    stepsData.map((item, index) => (
                        <div key={index} className='bg-white/20 border border-neutral-200 shadow-md cursor-pointer rounded-2xl p-5 px-8 flex items-center gap-4 hover:scale-[1.02] transition-all duration-300'>
                            <img src={item.icon} alt="" width={40} />
                            <div>
                                <h1 className='text-xl font-medium'>{item.title}</h1>
                                <p className='text-gray-500 text-sm'>{item.description}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Steps

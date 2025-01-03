import React from 'react'

const Skeleton = () => {
    return (
        <div className='min-h-screen flex justify-center mx-auto '>
            <div className="border shadow-md p-1 rounded-md animate-pulse w-full  md:w-4/12">
                <div className="p-3 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                        <div className="h-5 w-5 bg-gray-200 rounded-full"></div>
                        <div className="h-4 w-20 bg-gray-200 rounded ml-2"></div>
                    </div>
                    <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
                </div>
                <div className="h-4 w-3/4 bg-gray-200 rounded px-2 pb-2"></div>

                <div className="h-64 w-full bg-gray-200 rounded-md"></div>

                <div className="py-2 flex items-center justify-between border-b-2 px-2 border-gray-300">
                    <p className="flex items-center gap-1 "><span className="h-5 w-5 rounded-full bg-gray-200"></span>  <span className="h-4 w-3 bg-gray-200 rounded"></span> </p>
                    <div className="">
                        <div className="h-4 bg-gray-200 rounded w-16"></div>
                    </div>
                </div>
                <div className="p-3 flex items-center justify-between">
                    <p className="flex items-center gap-2"><span className="h-5 w-5 bg-gray-200 rounded-circle"></span></p>
                    <p className="flex items-center gap-2"><span className="h-5 w-5 bg-gray-200 rounded-circle"></span></p>
                    <p className="flex items-center gap-2"><span className="h-5 w-5 bg-gray-200 rounded-circle"></span></p>
                </div>
            </div>
        </div>
    )
}

export default Skeleton

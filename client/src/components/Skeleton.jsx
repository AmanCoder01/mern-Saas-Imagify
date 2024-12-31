import React from 'react'

const Skeleton = () => {
    return (
        <div className='min-h-screen flex justify-center mx-auto '>
            <div class="border shadow-md p-1 rounded-md animate-pulse w-4/12">
                <div class="p-3 flex items-center justify-between gap-2">
                    <div class="flex items-center gap-2">
                        <div class="h-5 w-5 bg-gray-200 rounded-full"></div>
                        <div class="h-4 w-20 bg-gray-200 rounded ml-2"></div>
                    </div>
                    <div class="h-6 w-6 bg-gray-200 rounded-full"></div>
                </div>
                <div class="h-4 w-3/4 bg-gray-200 rounded px-2 pb-2"></div>

                <div class="h-64 w-full bg-gray-200 rounded-md"></div>

                <div class="py-2 flex items-center justify-between border-b-2 px-2 border-gray-300">
                    <p class="flex items-center gap-1 "><div class="h-5 w-5 rounded-full bg-gray-200"></div>  <div class="h-4 w-3 bg-gray-200 rounded"></div> </p>
                    <div class="">
                        <div class="h-4 bg-gray-200 rounded w-16"></div>
                    </div>
                </div>
                <div class="p-3 flex items-center justify-between">
                    <p class="flex items-center gap-2"><div class="h-5 w-5 bg-gray-200 rounded-circle"></div></p>
                    <p class="flex items-center gap-2"><div class="h-5 w-5 bg-gray-200 rounded-circle"></div></p>
                    <p class="flex items-center gap-2"><div class="h-5 w-5 bg-gray-200 rounded-circle"></div></p>
                </div>
            </div>
        </div>
    )
}

export default Skeleton

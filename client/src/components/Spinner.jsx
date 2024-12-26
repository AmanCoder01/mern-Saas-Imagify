import React from 'react'

const Spinner = ({ width = 6, height = 6 }) => {
    return (
        <div className={`w-${width} h-${height}`}>
            <div className={`w-${width} h-${height} border-4 border-blue-400 border-solid border-t-transparent rounded-full animate-spin`}></div>
        </div>

    )
}

export default Spinner

import React from 'react'
import { BsFillImageFill } from 'react-icons/bs'

export const ItemGrid = () => {
    return (
        <div className='color-wave w-full h-60 bg-slate-100 rounded-md flex justify-center items-center p-4'>
            <BsFillImageFill size={48} className=' text-slate-200' />
        </div>
    )
}

const ImageGrid = () => {

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <ItemGrid />
            <ItemGrid />
            <ItemGrid />
            <ItemGrid />
            <ItemGrid />
            <ItemGrid />
            <ItemGrid />
            <ItemGrid />
            <ItemGrid />
            <ItemGrid />
            <ItemGrid />
            <ItemGrid />
        </div>
    )
}

export default ImageGrid
import React from 'react'

function Card({ name, bio, status, time, imgurl }) {
    return (
        <div className='grid gap-2 mt-2 mx-1'>
            <div className='flex bg-[#e7f1ff]  shadow-lg py-4 justify-between px-5 items-center rounded-md '>
                <div className='flex gap-8'>
                    <div className="avatar">
                        <div className="ring-primary ring-offset-base-100 w-12 rounded-full ring ring-offset-2">
                            <img src={imgurl} />
                        </div>
                    </div>
                    <div>
                        <div className='text-xl font-semibold'>{name}</div>
                        <div className='text-gray-600 text-xs'>{bio}</div>
                    </div>
                </div>
                <div className='flex flex-col gap-1'>
                    <div className=' '>{time}</div>
                    <div><div className='w-3 h-3 rounded-full bg-green-700 float-end '></div></div>
                </div>

            </div>
            <hr></hr>
        </div>
    )
}

export default Card
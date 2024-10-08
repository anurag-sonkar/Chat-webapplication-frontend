import React, { useState } from 'react'
import { CommentOutlined, CustomerServiceOutlined } from '@ant-design/icons';
import { ImAttachment } from 'react-icons/im';
import { MdAudioFile } from 'react-icons/md';
import { FaFileVideo, FaImage } from 'react-icons/fa6';
import { FaFileAlt } from 'react-icons/fa';

function MessageAttachments() {
    const [open, setOpen] = useState(false); // Manage open/close state

    const toggleOpen = () => {
        setOpen(!open); // Toggle the open state
    }

    return (
        <div className='relative'>
            <button onClick={toggleOpen} className="px-2 rounded-lg">
                <ImAttachment size={25} />
            </button>
            {open && (
                <div className='absolute flex flex-col gap-2 bottom-10 left-0 bg-white p-2 shadow-md rounded-md'>
                    {/* Replace FloatButtons with normal buttons or icons */}
                    <button className="p-2 hover:bg-gray-100 rounded-lg flex gap-3 items-center">
                        <MdAudioFile size={20}/>
                        <p className='font-semibold text-sm'>Audio</p>
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg flex gap-3 items-center">
                        <FaFileVideo size={20}/>
                        <p className='font-semibold text-sm'>Video</p>
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg flex gap-3 items-center">
                        <FaImage size={20}/>
                        <p className='font-semibold text-sm'>Image</p>
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg flex gap-3 items-center">
                        <FaFileAlt size={20}/>
                        <p className='font-semibold text-sm'>File</p>
                    </button>
                </div>
            )}
        </div>
    )
}

export default MessageAttachments;

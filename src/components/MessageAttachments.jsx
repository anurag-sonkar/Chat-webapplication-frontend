import React, { useState } from 'react'
import { CommentOutlined, CustomerServiceOutlined } from '@ant-design/icons';
import { ImAttachment } from 'react-icons/im';
import { MdAudioFile } from 'react-icons/md';
import { FaFileVideo, FaImage } from 'react-icons/fa6';
import { FaFileAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addPreview } from '../features/previews/previewSlice';
import { FcAudioFile } from 'react-icons/fc';

function MessageAttachments({ setAttachments, open, setOpen }) {
    const dispatch = useDispatch()
     // Manage open/close state

    const toggleOpen = (e) => {
        e.preventDefault(); // Prevent form submission when clicking on the attachment icon
        setOpen(!open); // Toggle the open state
    };


    const handleAttachmentSelect = (e)=>{
        setAttachments(e.target.files)

        // setting up for preview
        const selectedFiles = Array.from(e.target.files);

        const filePreviews = selectedFiles.map((file) => {
            const fileType = file.type;
            const previewUrl = URL.createObjectURL(file);

            return { name: file.name, type: fileType, url: previewUrl };
        });

        dispatch(addPreview(filePreviews))
        setOpen(false)

    }

    return (
        <div className='relative'>
            <button onClick={toggleOpen} className="px-2 rounded-lg">
                <ImAttachment size={25} />
            </button>
            {open && (
                <div className='absolute flex flex-col gap-2 bottom-10 left-0 bg-white p-2 shadow-md rounded-md w-44'>
                    {/* Replace FloatButtons with normal buttons or icons */}
                    {/* image select */}
                    <div>
                        <input type='file' accept='image/*' id='images' className='hidden' onChange={(e)=>handleAttachmentSelect(e)}/>
                        <label className="p-2 hover:bg-gray-100 rounded-lg flex gap-3 items-center" htmlFor='images'>
                            <FaImage size={20} />
                            <p className='font-semibold text-sm'>Image</p>
                        </label>
                    </div>
                    {/** audio */}
                    <div>
                        <input type='file' accept='audio/*' id='audio' className='hidden' onChange={(e)=>handleAttachmentSelect(e)} />
                        <label className="p-2 hover:bg-gray-100 rounded-lg flex gap-3 items-center" htmlFor='audio'>
                            <MdAudioFile size={20} />
                            <p className='font-semibold text-sm'>Audio</p>
                        </label>
                    </div>
                    {/** video */}
                    <div>
                        <input type='file' accept='video/*' id='video' className='hidden' onChange={(e)=>handleAttachmentSelect(e)} />
                        <label className="p-2 hover:bg-gray-100 rounded-lg flex gap-3 items-center" htmlFor='video'>
                            <FaFileVideo size={20} />
                            <p className='font-semibold text-sm'>Video</p>
                        </label>
                    </div>
                    
                    {/* <button className="p-2 hover:bg-gray-100 rounded-lg flex gap-3 items-center">
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
                    </button> */}
                </div>
            )}
        </div>
    )
}

export default MessageAttachments;

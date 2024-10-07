import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaCamera } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { updateAvatar } from '../features/auth/authSlice';
import Loading from '../components/Loading';

import { FaUsers } from "react-icons/fa6";
import { updateGroupName } from '../features/groups/groupSlice';


function GroupProfile() {
    const [imagePreview, setImagePreview] = useState(null);  // For preview
    const { selectedGroup, isLoading } = useSelector(state => state.group)
    const [groupName, setGroupName] = useState('') // set , and chnaged on input
    const dispatch = useDispatch()

    useEffect(
        ()=>{
            setGroupName(selectedGroup?.name)
        }, [selectedGroup]
    )

    // Use the dropzone hook
    const onDrop = useCallback((acceptedFiles) => {
        // Only accept the first file if multiple files are dropped
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0]; // Get the first file
            const reader = new FileReader();

            reader.onload = () => {
                // Display the image preview
                setImagePreview(reader.result);

                // const formData = new FormData();
                // formData.append("avatar", file); // Append the selected file
                // formData.append('public_id', user?.avatar?.public_id); // Append existing public ID if needed

                // dispatch(updateAvatar(formData)); // Dispatch the action with the selected file
            };
            reader.readAsDataURL(file); // Read file as a data URL for image preview
        }
    }, [dispatch]);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*',
        noClick: true, // Disable default click behavior
        noKeyboard: true // Disable keyboard events
    });

    
    const handleUpdateGroupName = ()=>{
        // const formData = new FormData()
        // formData.append("chatId", selectedGroup?._id)
        // formData.append("chatName" , groupName)
        const formData = {
            "chatId" : selectedGroup?._id,
            "chatName" : groupName
        }
        dispatch(updateGroupName(formData))
    }

    return (
            <div className='grid justify-center gap-6'>
            {/** avatar upadte */}
            <div className='flex justify-center'>
                {
                    selectedGroup?.avatar?.url || imagePreview ? (
                        <div className='max-w-56 relative'>
                            <img
                                src={imagePreview || selectedGroup.avatar.url}
                                alt="Profile"
                                className="w-48 h-48 p-1 object-cover rounded-full shadow-md"
                            />
                            {
                                isLoading && <Loading color='white' />
                            }
                            <span
                                className='absolute top-[80%] right-[15%] cursor-pointer'
                                onClick={() => document.getElementById('avatar-input').click()} // Trigger click on file input
                            >
                                <FaCamera size={30} />
                            </span>
                        </div>
                    ) : (
                        <div className='w-48 h-48 flex items-center justify-center bg-gray-300 rounded-full'>
                            <span>No Image</span>
                            <span
                                className='absolute cursor-pointer'
                                onClick={() => document.getElementById('avatar-input').click()} // Trigger click on file input
                            >
                                <FaCamera size={30} />
                            </span>
                        </div>
                    )
                }

                <input
                    {...getInputProps()}
                    id="avatar-input"
                    className="hidden" // Hide the input
                    disabled={isLoading}
                />

            </div>

            {/* gp name */}
            <div className='flex justify-center gap-6'>
                <label className="input input-bordered flex items-center gap-2">
                    <FaUsers />
                    <input type="text" className="grow" placeholder="Group Name" value={groupName} onChange={(e) => setGroupName(e.target.value)} />
                </label>
                <button className="btn btn-warning" onClick={handleUpdateGroupName}>Update</button>
            </div>

            <button className="btn btn-outline btn-error mt-12">Delete Group</button>

            </div>

            
    )
}

export default GroupProfile
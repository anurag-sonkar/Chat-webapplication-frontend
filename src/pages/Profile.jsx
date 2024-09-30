import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaCamera } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { updateAvatar } from '../features/auth/authSlice';
import Loading from '../components/Loading';

function Profile() {
    const [imagePreview, setImagePreview] = useState(null);  // For preview
    const { user  ,isLoading} = useSelector(state => state.auth);
    const dispatch = useDispatch();

    // Use the dropzone hook
    const onDrop = useCallback((acceptedFiles) => {
        // Only accept the first file if multiple files are dropped
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0]; // Get the first file
            const reader = new FileReader();

            reader.onload = () => {
                // Display the image preview
                setImagePreview(reader.result);

                const formData = new FormData();
                formData.append("avatar", file); // Append the selected file
                formData.append('public_id', user?.avatar?.public_id); // Append existing public ID if needed

                dispatch(updateAvatar(formData)); // Dispatch the action with the selected file
            };
            reader.readAsDataURL(file); // Read file as a data URL for image preview
        }
    }, [dispatch, user]);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*',
        noClick: true, // Disable default click behavior
        noKeyboard: true // Disable keyboard events
    });

    return (
        <div className="w-full h-full bg-blue-50 flex flex-col items-center justify-center gap-6 rounded-md ">
            {
                user?.avatar?.url || imagePreview ? (
                    <div className='max-w-56 relative'>
                        <img
                            src={imagePreview || user.avatar.url}
                            alt="Profile"
                            className="w-48 h-48 object-cover rounded-full"
                        />
                        {
                            isLoading && <Loading color='white'/>
                        }
                        <span
                            className='absolute top-[80%] right-[15%] cursor-pointer'
                            onClick={() => document.getElementById('file-input').click()} // Trigger click on file input
                        >
                            <FaCamera size={30} />
                        </span>
                    </div>
                ) : (
                    <div className='w-48 h-48 flex items-center justify-center bg-gray-300 rounded-full'>
                        <span>No Image</span>
                        <span
                            className='absolute cursor-pointer'
                            onClick={() => document.getElementById('file-input').click()} // Trigger click on file input
                        >
                            <FaCamera size={30} />
                        </span>
                    </div>
                )
            }

            <input
                {...getInputProps()}
                id="file-input"
                className="hidden" // Hide the input
                disabled={isLoading}
            />

            {/* other info of user */}
            <div className='w-full px-2 grid gap-2'>
                <div className='bg-white px-6 shadow-sm rounded-sm flex flex-col gap-2 py-2 '>
                    <h1 className='text-md font-semibold text-blue-800'>Your name</h1>
                    <div className='flex items-center justify-between'>
                        <p className='text-xs'>{user?.name}</p> {/* Show user's name */}
                        <MdEdit size={22} color='#ccc' />
                    </div>
                </div>
                <div className='bg-white px-6 shadow-sm rounded-sm flex flex-col gap-2 py-2'>
                    <h1 className='text-md font-semibold text-blue-800'>Your email</h1>
                    <div className='flex items-center justify-between'>
                        <p className='text-xs'>{user?.email}</p> {/* Show user's email */}
                        <MdEdit size={22} color='#ccc' />
                    </div>
                </div>
                <div className='bg-white px-6 shadow-sm rounded-sm flex flex-col gap-2 py-2'>
                    <h1 className='text-md font-semibold text-blue-800'>About</h1>
                    <div className='flex items-center justify-between'>
                        <p className='text-xs'>Can't talk, WhatsApp only</p>
                        <MdEdit size={22} color='#ccc' />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;

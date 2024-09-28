import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaCamera } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

function Profile() {
    const [imagePreview, setImagePreview] = useState(null);  // For preview
    const [uploadProgress, setUploadProgress] = useState(0); // For progress

    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader();

            reader.onabort = () => console.log('file reading was aborted');
            reader.onerror = () => console.log('file reading has failed');
            reader.onloadstart = () => setUploadProgress(0);
            reader.onprogress = (event) => {
                if (event.lengthComputable) {
                    const percentCompleted = Math.round((event.loaded * 100) / event.total);
                    setUploadProgress(percentCompleted);
                }
            };
            reader.onload = () => {
                // Display image preview
                setImagePreview(URL.createObjectURL(file));
                setUploadProgress(100);  // Set progress to 100 when done
            };

            reader.readAsDataURL(file);  // Read file as a data URL for image preview
        });
    }, []);

    const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*' });

    return (
        <div className="w-full h-full bg-blue-50 flex flex-col items-center gap-6 py-2 rounded-md">
            

            {/* Show image preview */}
            {imagePreview && (
                <div className="mt-4 rounded-full shadow-lg">
                    <img
                        src={imagePreview}
                        alt="Preview"
                        style={{ width: 200, height: 200, objectFit: 'cover', borderRadius: '50%' }}
                    />
                </div>
            )}

            {/* Show upload progress */}
            {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="mt-4 w-64 bg-gray-300 rounded-full">
                    <div
                        className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                        style={{ width: `${uploadProgress}%` }}
                    >
                        {uploadProgress}%
                    </div>
                </div>
            )}

            {
                !imagePreview && <div {...getRootProps()} className="w-64 h-64 text-black cursor-pointer rounded-full grid place-items-center ">
                    <input {...getInputProps()} />
                    <p className='profile-avatar-preview flex flex-col justify-center items-center text-white relative gap-2'>
                        <p><FaCamera size={25} /></p>
                        <p className='max-w-24 text-center font-semibold'>ADD PROFILE PHOTO</p>

                    </p>
                </div>
            }

            {/* other info of user */}
            <div className='w-full px-2 grid gap-2'>
                <div className='bg-white px-6 shadow-sm rounded-sm flex flex-col gap-2 py-2 '>
                    <h1 className='text-md font-semibold text-blue-800'>Your name</h1>
                    <div className='flex items-center justify-between'>
                        <p className='text-xs'>Anurag Sonkar</p>
                        <MdEdit size={22} color='#ccc' />
                    </div>
                </div>
                <div className='bg-white px-6 shadow-sm rounded-sm flex flex-col gap-2 py-2'>
                    <h1 className='text-md font-semibold text-blue-800'>Your email</h1>
                    <div className='flex items-center justify-between'>
                        <p className='text-xs'>anuragsonkar053@gmail.com</p>
                        <MdEdit size={22} color='#ccc' />
                    </div>
                </div>
                
                <div className='bg-white px-6 shadow-sm rounded-sm flex flex-col gap-2 py-2'>
                    <h1 className='text-md font-semibold text-blue-800'>About</h1>
                    <div className='flex items-center justify-between'>
                        <p className='text-xs'>Can't talk Whatsapp only</p>
                        <MdEdit size={22} color='#ccc' />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;

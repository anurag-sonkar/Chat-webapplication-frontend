import React from 'react'
import { FaFileAlt } from 'react-icons/fa'
import { IoSend } from 'react-icons/io5'
import { RxCross2 } from 'react-icons/rx'
import { useDispatch, useSelector } from 'react-redux'
import { clearImagePreview, clearDocPreview } from '../features/previews/previewSlice'
import { sendMessage } from '../features/messages/messageSlice'
import axios from 'axios'

function Preview() {
    const { files, docs , attachments } = useSelector(state => state.preview)
    const { selectedChat } = useSelector(state=>state.chat)
    const dispatch = useDispatch()
    console.log("files", files)
    console.log("docs", docs)

    const renderImagePreviews = () => {
        return files.map((file, index) => (
            <div key={index} className="flex items-center gap-2 p-2">
                <img src={file.url} alt="Preview" className="w-24 h-24 object-cover" />
            </div>
        ));
    };

    const renderDocsPreviews = () => {
        return docs.map((doc, index) => (
            <div key={index} className="flex items-center gap-3 p-2 border-b bg-blue-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
                <FaFileAlt size={30} />
                <p>{doc.name}</p>
            </div>
        ));
    };

    const handleResetAttachment = ()=>{
        dispatch(clearImagePreview())
        dispatch(clearDocPreview())
    }

    // Upload file to Cloudinary
    const uploadFile = async (payload) => {
        console.log(payload, "payloaodo")
        const data = new FormData();
        data.append('file', payload);  // Use 'file' for Cloudinary
        data.append('upload_preset', 'attachments');  // Replace with your preset

        try {
            const res = await axios.post('https://api.cloudinary.com/v1_1/dj6iduopf/auto/upload', data);

            // Log and return Cloudinary response data (URL, public_id)
            console.log(res.data);
            return {
                url: res.data.secure_url, // Cloudinary file URL
                public_id: res.data.public_id, // Cloudinary file ID
            };
        } catch (error) {
            console.error("Error uploading to Cloudinary: ", error);
            throw error; // Re-throw to handle error in the caller function
        }
    };

    // Handle sending attachments
    const handleSendAttachments = async () => {
        try {
            // Upload the attachment first
            const uploadedFile = await uploadFile(attachments );

            if (uploadedFile) {
                // Prepare message payload with Cloudinary URL and public_id
                const messagePayload = {
                    chatId: selectedChat?._id,
                    content: '', // No content yet, but will add caption in the future
                    attachments: {
                        url: uploadedFile.url,    // Cloudinary URL
                        public_id: uploadedFile.public_id,  // Cloudinary public ID
                    },
                };

                // Dispatch the message with attachment URL
                const messagePromise = dispatch(sendMessage(messagePayload)).unwrap();

                console.log('Message sent:', messagePromise);
            }
        } catch (error) {
            console.error('Error sending attachments:', error);
        }
    };


    return (
        <div className='flex flex-col relative bottom-0 px-4 py-5 gap-5 bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 '>
            <div onClick={handleResetAttachment}><RxCross2 size={30}/></div>
            <div className='flex items-center gap-4 justify-between'>
                {files.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {renderImagePreviews()}
                    </div>
                )}

                {docs.length > 0 && (
                    <div className="flex flex-col">
                        {renderDocsPreviews()}
                    </div>
                )}

                <button className="btn btn-circle btn-outline" onClick={handleSendAttachments}>
                    <IoSend size={25}/>
                </button>
            </div>

        </div>
    )
}

export default Preview
import React, { useCallback, useState } from 'react'
import { Select, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useDropzone } from 'react-dropzone'
import { FaCamera } from 'react-icons/fa';
import { MdGroups } from "react-icons/md";

function CreateNewGroup() {
    const { chats } = useSelector(state => state.chat)
    const [members, setMembers] = useState([])
    const maxMembersAllowed = 50
    const [imagePreview, setImagePreview] = useState(null);  // For preview
    const [groupName , setGroupName] = useState("") // gp name
    const dispatch = useDispatch()
    let formData = new FormData();

    const handleChange = (value) => {
        setMembers(value)
    };

    const options = chats?.length > 0 && chats.map((chat, index) => {
        if (chat?.isGroupChat === false) {
            return {
                label: chat?.members?.[0]?.name,
                desc: <div>{chat?.members?.[0]?.name}</div>,
                value: chat?.members?.[0]._id,
                emoji: <img src={chat?.members?.[0]?.avatar?.url} className='w-8 h-8 rounded-full' />
            }
        }
    })


    // group profile upoad
    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
        if (acceptedFiles.length > 0) {
            let file = acceptedFiles[0]; // Get the first file
            const reader = new FileReader();
            reader.onload = () => {
                // Display the image preview
                setImagePreview(reader.result);
                formData.append("avatar", file); // Append the selected file

            };
            reader.readAsDataURL(file); // Read file as a data URL for image preview
        }
    }, [dispatch])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    const handleCreateNewGroup = ()=>{
        formData.append("name" , groupName)
        formData.append('members' , members)

        // formData.forEach((ele)=>console.log(ele))
        // console.log(formData.getAll('avatar'))
        return
    }


    return (
        <div className='h-full w-full relative'>
            <div>
                <Select
                    autoFocus={true}
                    size='large'
                    open="true"
                    mode="multiple"
                    style={{
                        width: '100%',
                    }}
                    placeholder="Select Group Members min 2 required"
                    //   defaultValue={['china']}
                    onChange={handleChange}
                    filterOption={(inputValue, option) => option?.label.toLowerCase().includes(inputValue.toLowerCase())}
                    maxCount={maxMembersAllowed}
                    options={options}
                    optionRender={(option) => (
                        <Space>
                            <span role="img" aria-label={option.data.label}>
                                {option.data.emoji}
                            </span>
                            {option.data.desc}
                        </Space>
                    )}
                />

            </div>

            {/* group image upload preview */}
            {
                members.length > 1 && <div className='absolute bottom-0 min-w-full grid gap-2 '>
                    <div className='flex items-center justify-center mb-2'>
                        <div className='w-36 h-36  rounded-full relative cursor-pointer'>
                            <img src={imagePreview ? imagePreview : '/assets/profile-placeholder.jpeg'} alt='upload avatar' className='rounded-full' />
                            <span
                                className='absolute top-[80%] right-[15%] cursor-pointer'
                                onClick={() => document.getElementById('file-input').click()} // Trigger click on file input
                            >
                                <FaCamera size={30} />
                            </span>
                        </div>

                        <input
                            {...getInputProps()}
                            id="file-input"
                            className="hidden" // Hide the input
                        //   disabled={isLoading}
                        />
                    </div>
                    <label className="input input-bordered flex items-center gap-6">
                        <MdGroups size={25} />
                        <input type="text" className="grow" placeholder="Group Name" value={groupName} onChange={(e)=>setGroupName(e.target.value)} />
                    </label>
                    <button className='btn btn-active btn-neutral w-full' onClick={handleCreateNewGroup}>Create Group</button>
                </div>
            }
        </div>
    )
}

export default CreateNewGroup
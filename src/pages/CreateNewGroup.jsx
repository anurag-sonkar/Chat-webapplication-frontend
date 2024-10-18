import React, { useCallback, useEffect, useState } from 'react'
import { Select, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useDropzone } from 'react-dropzone'
import { FaCamera } from 'react-icons/fa';
import { MdGroups } from "react-icons/md";
import { createNewGroup, getAllChats } from '../features/chats/chatSlice';

function CreateNewGroup() {
    const { chats } = useSelector(state => state.chat)
    const [members, setMembers] = useState([])
    const maxMembersAllowed = 50
    const [imagePreview, setImagePreview] = useState(null);  // For preview
    const [groupName, setGroupName] = useState("") // gp name
    const [groupImage, setGroupImage] = useState("") // gp image
    const [active, setActive] = useState(false)
    const [dropdown , setDropdown] = useState(true)
    const dispatch = useDispatch()
    let formData = new FormData();

    const handleChange = (value) => {
        setMembers(value)
    };

    const options = chats?.length > 0
        ? chats.map((chat) => {
            if (chat?.isGroupChat === false) {
                return {
                    label: chat?.members?.[0]?.name,
                    desc: <div>{chat?.members?.[0]?.name}</div>,
                    value: chat?.members?.[0]?._id,
                    emoji: <img src={chat?.members?.[0]?.avatar?.url} className='w-8 h-8 rounded-full' alt="avatar" />
                };
            }
            return null;  // Ensure non-matching chats return null instead of undefined
        }).filter(option => option !== null)  // Remove any null values from the array
        : [];


    // console.log(options)
    // group profile upoad
    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
        if (acceptedFiles.length > 0) {
            let file = acceptedFiles[0]; // Get the first file
            const reader = new FileReader();
            reader.onload = () => {
                // Display the image preview
                setImagePreview(reader.result);
                setGroupImage(file)
            };
            reader.readAsDataURL(file); // Read file as a data URL for image preview
        }
    }, [dispatch])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    const handleCreateNewGroup = () => {
        formData.append("name", groupName)
        // Appending each member individually
        members.forEach(member => {
            formData.append("members", member);
        });

        if (groupImage) {
            formData.append("avatar", groupImage);
        }
        dispatch(createNewGroup(formData))
        // formData.forEach((ele)=>console.log(ele))
        // console.log(formData.getAll('avatar'))
    }


    useEffect(
        () => {
            dispatch(getAllChats())
        }, []
    )

    // on members set active true 
    useEffect(
        ()=>{
            if(members.length > 1) setActive(true)
            else setActive(false)
        },
        [members]
    )

    const handleDropdownClose = ()=>{
        if(members.length >= 2){

            setDropdown(false)
        }else{
            return
        }
    }

    return (
        <div className='max-h-[84vh] h-screen w-full relative'>
            <div onClick={()=>setDropdown(true)}>
                <Select
                    autoFocus={true}
                    size='large'
                    open={dropdown}
                    mode="multiple"
                    style={{
                        width: '100%',
                    }}
                    placeholder="Select Group Members min 2 required"
                    onChange={handleChange}
                    filterOption={(inputValue, option) => option?.label.toLowerCase().includes(inputValue.toLowerCase())}
                    maxCount={maxMembersAllowed}
                    options={options}
                    optionRender={(option) => (
                        <Space>
                            <span role="img" aria-label={option?.data?.label}>
                                {option?.data?.emoji}
                            </span>
                            {option?.data?.desc}
                        </Space>
                    )}
                />

            </div>

            {/* group image upload preview */}
            <div className='absolute bottom-0 min-w-full grid gap-2 ' onClick={handleDropdownClose}>
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
                      disabled={!active}
                    />
                </div>
                <label className="input input-bordered flex items-center gap-6">
                    <MdGroups size={25} />
                    <input type="text" className="grow" placeholder="Group Name" value={groupName} onChange={(e) => setGroupName(e.target.value)} disabled={!active} />
                </label>
                <button className='btn btn-active btn-neutral w-full' onClick={handleCreateNewGroup} disabled={!active}>Create Group</button>
            </div>
        </div>
    )
}

export default CreateNewGroup
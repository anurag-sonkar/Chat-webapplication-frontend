import React, { useEffect, useState } from 'react'
import { Select, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getAllChats } from '../features/chats/chatSlice';
import { addNewGroupMembers } from '../features/groups/groupSlice';
import Loading from './Loading';

function AddGroupMember({ isActive }) {
    const dispatch = useDispatch()
    const { selectedGroup, isLoading } = useSelector((state) => state.group)
    const { chats } = useSelector(state => state.chat)
    const [availableFriendsToAdd, setAvailableFriendsToAdd] = useState([])
    const [members, setMembers] = useState([])
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleChange = (value) => {
        setMembers(value)
    };
    console.log(members)


    useEffect(
        () => {
            dispatch(getAllChats())
        }, []
    )

    // Which are friends of auth user but not in an selected chat group , must be available for selection and then dipatchd to add in group
    useEffect(
        () => {
            setMembers([])
            // console.log(selectedGroup)
            // console.log(chats)

            // filter gp chats only
            const filterChats = chats
                .filter(chat => chat?.isGroupChat === false)
                .map(chat => chat?.members?.[0]);


            // filter already in group persons
            const alreadyInGroup = selectedGroup?.members

            // Assuming alreadyInGroup is an array of objects with unique identifiers (like _id)
            const alreadyInGroupIds = alreadyInGroup.map(member => member._id); // Extracting IDs

            const filteredChats = filterChats.filter(chatMember => {
                // Check if chatMember is not in alreadyInGroup
                return !alreadyInGroupIds.includes(chatMember._id);
            });

            // Log the filtered results
            setAvailableFriendsToAdd(filteredChats)


        }, [selectedGroup, chats]
    )

    useEffect(() => {
        // Open dropdown only when the tab is active
        if (isActive) {
            setDropdownOpen(true);
        } else {
            setDropdownOpen(false);
        }
    }, [isActive]);

    const options = availableFriendsToAdd?.map((user) => {
        return {
            label: user.name,
            desc: (
                <div className='flex justify-between items-center w-[360px] px-4'>
                    <div className='text-lg font-semibold'>{user?.name}</div>
                    <div className='text-right text-blue-400'>{user?.email}</div>
                </div>
            ),
            value: user?._id,
            emoji: <img src={user?.avatar?.url} className='w-12 h-12 rounded-full' alt="avatar" />
        }
    })


    // 
    const handleAddMembers = () => {
        // chatId , members
        dispatch(addNewGroupMembers({
            "chatId": selectedGroup?._id,
            "members": members
        }))
    }

    return (
        <div className='w-full h-full flex flex-col justify-between'>
            <div>
                <Select
                disabled={isLoading}
                    open={dropdownOpen}
                    value={members}
                    mode="multiple"
                    style={{
                        width: '100%',
                    }}
                    size="large"
                    placeholder="Search & Select to Add Members"
                    onChange={handleChange}
                    filterOption={(inputValue, option) => {
                        const { label } = option;
                        const email = option?.desc.props.children[1].props.children; // Access email from desc
                        return label.toLowerCase().includes(inputValue.toLowerCase()) || email.toLowerCase().includes(inputValue.toLowerCase());
                    }}

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
            <button className="btn btn-warning text-lg shadow-md" onClick={handleAddMembers} disabled={isLoading}>Add Members</button>
            {
                isLoading && <Loading />
            }

        </div>

    )
}

export default AddGroupMember
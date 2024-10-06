import React, { useEffect, useState } from 'react';
import { Avatar, Tooltip, Popover } from 'antd';
import { resetSelectedUser, setSelectedUser } from '../features/users/userSlice';
import { resetSelectedChat, setFriendChat } from '../features/chats/chatSlice';
import { useDispatch, useSelector } from 'react-redux';

function GroupChatCard({ groupChat }) {
    const [avatar, setAvatar] = useState([]);
    const [extraAvatars, setExtraAvatars] = useState([]);
    const dispatch = useDispatch()
    const { onlineUsers } = useSelector(state => state.user)
    const { selectedChat } = useSelector(state => state.chat)
    const [activeMembers , setActiveMembers] = useState('')

    useEffect(() => {
        // making group avatar
        if (groupChat?.members) {
            const memberAvatars = groupChat?.members?.map((ele) => ele?.avatar?.url);

            // Shuffle and select 3 random avatars (this includes admin's avatar)
            const shuffledAvatars = memberAvatars.sort(() => 0.5 - Math.random());
            const selectedAvatars = shuffledAvatars.slice(0, 3); // Pick any 3 random avatars

            setAvatar(selectedAvatars);

            // The rest go into the extra avatars
            const remainingAvatars = shuffledAvatars.slice(3);
            setExtraAvatars(remainingAvatars);
        }

    }, [groupChat]);

    const ExtraAvatarsPopover = (
        <div>
            {extraAvatars.map((ele, index) => (
                <Avatar key={index} src={ele} style={{ marginRight: 4 }} />
            ))}
        </div>
    );

    const setUser = (id) => {
        dispatch(setFriendChat(id))
        dispatch(resetSelectedUser())
    }

    // calcuating total active in real time
    // calculating active members - 
    // step 1 : get all group members id 
    // step 2 : active frineds from redux- store 
    // step 3 : matched were active in group

    // console.log("onlineUsers", onlineUsers)
    useEffect(() => {
        if (groupChat && onlineUsers) {
            // Get an array of online group member ids
            const onlineGroupMembers = groupChat.members
                .filter((member) => onlineUsers.includes(member._id))
                .map((member) => member._id); // Map to ids after filtering

            console.log("Number of active online group members:", onlineGroupMembers.length);
            setActiveMembers(onlineGroupMembers.length)
        }
    }, [groupChat, onlineUsers]);

    return (
        <div className='grid gap-2 mt-2 mx-1 cursor-pointer' onClick={() => setUser(groupChat?._id)} >

            <div className={`transition-all ease-in-out duration-150  hover:bg-[#22313f] hover:text-white rounded-md flex items-center justify-between p-4 bg-[#e7f1ff]  shadow-lg ${selectedChat?._id === groupChat?._id ? "bg-[#005792] text-white" : "bg-[#73b1c1]"}`}>
                <div>
                    <Avatar.Group maxCount={4} size={40} maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
                        {avatar?.map((ele, index) => (
                            <Avatar src={ele} key={index} />
                        ))}

                        {groupChat?.members?.length > 3 && (
                            <Popover content={ExtraAvatarsPopover}>
                                <Avatar>+{groupChat?.members?.length - 3}</Avatar>
                            </Popover>
                        )}
                    </Avatar.Group>
                </div>
                {/*name*/}
                <div className='font-semibold text-lg'>
                    {groupChat?.name}

                </div>
                <div className='font-semibold text-xs'>
                    {activeMembers && activeMembers}/{groupChat?.members?.length} active

                </div>
            </div>
            <hr></hr>
        </div>
    );
}

export default GroupChatCard;

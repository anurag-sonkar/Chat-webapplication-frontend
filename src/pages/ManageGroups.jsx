import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMyGroups, setGroupChat } from '../features/groups/groupSlice';
import { Avatar, Tooltip, Popover } from 'antd';
import { resetSelectedChat } from '../features/chats/chatSlice';
import { resetSelectedUser } from '../features/users/userSlice';

// Groups whose admin is auth user - fetched from separate API
function ManageGroups() {
    const dispatch = useDispatch();
    const { groups, isLoading } = useSelector(state => state.group); // Array of groups
    const [avatars, setAvatars] = useState({}); // Store avatars for each group
    const [extraAvatars, setExtraAvatars] = useState({}); // Store extra avatars for each group
    const [search, setSearch] = useState("")
    const { selectedGroup } = useSelector((state) => state.group)


    useEffect(() => {
        dispatch(getAllMyGroups());
    }, [dispatch]);

    useEffect(() => {
        if (groups.length) {
            let avatarsMap = {};
            let extraAvatarsMap = {};

            groups.forEach(group => {
                let groupAvatars = [];

                // Add group admin avatar first if it exists
                if (group?.groupAdmin?.avatar?.url) {
                    groupAvatars.push(group.groupAdmin.avatar.url);
                }

                // Add rest of the members' avatars (after admin)
                const memberAvatars = group.members.map((ele) => ele.avatar?.url);
                groupAvatars = groupAvatars.concat(memberAvatars);

                // Limit displayed avatars to 3 and store the rest as extra
                const displayedAvatars = groupAvatars.slice(0, 5);
                const remainingAvatars = groupAvatars.slice(5);

                avatarsMap[group._id] = displayedAvatars;
                extraAvatarsMap[group._id] = remainingAvatars;
            });

            setAvatars(avatarsMap); // Map of groupId -> avatars
            setExtraAvatars(extraAvatarsMap); // Map of groupId -> extra avatars
        }
    }, [groups]);

    const ExtraAvatarsPopover = (groupId) => (
        <div>
            {extraAvatars[groupId]?.map((ele, index) => (
                <Avatar key={index} src={ele} style={{ marginRight: 4 }} />
            ))}
        </div>
    );

    // search group - pendng
    const handleSearchFriend = (e) => {
        const searchValue = e.target.value;
        setSearch(searchValue);

        // if (searchValue.trim() === "") {
        //     // If search input is empty, fetch all chats again
        //     dispatch(getAllChats());
        // } else {
        //     // Otherwise, filter chats based on the search value
        //     dispatch(filterChats(searchValue));
        // }
    }

    // dispatch id to manage gp
    const handleManageGroup = (id)=>{
        dispatch(setGroupChat(id))
        dispatch(resetSelectedChat())
        dispatch(resetSelectedUser())
    }

    return (
        <div>
            {/* Search input box -1 for friends only */}
            <label className="input input-bordered flex items-center gap-2">
                <input type="text" className="grow" placeholder="Search" value={search} onChange={handleSearchFriend} />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70">
                    <path
                        fillRule="evenodd"
                        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                        clipRule="evenodd" />
                </svg>
            </label>
            {/* group cards */}
            <div className='grid gap-6 overflow-y-scroll custom-scrollbar px-2 py-4'>
                {groups?.map((group) => (
                    <div className={`flex flex-col ${selectedGroup?._id === group?._id ? "" : ""}`}>
                        <div key={group._id} className='flex flex-col items-center justify-between cursor-pointer' >
                            <div>
                                <Avatar.Group maxCount={6} size={50} maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
                                    {avatars[group._id]?.map((ele, index) => (
                                        <Avatar src={ele} key={index} />
                                    ))}

                                    {extraAvatars[group._id]?.length > 0 && (
                                        <Popover content={ExtraAvatarsPopover(group._id)}>
                                            <Avatar>+{extraAvatars[group._id]?.length}</Avatar>
                                        </Popover>
                                    )}
                                </Avatar.Group>
                            </div>
                            <div className='text-lg font-semibold'>{group?.name}</div>


                        </div>
                        <button onClick={() => handleManageGroup(group?._id)} className={`btn btn-active  btn-sm mb-2 ${selectedGroup?._id === group?._id ? "btn-neutral" : "btn-ghost"}`}>Manage</button>
                        <hr></hr>
                    </div>
                ))}

            </div>
        </div>
    );
}

export default ManageGroups;

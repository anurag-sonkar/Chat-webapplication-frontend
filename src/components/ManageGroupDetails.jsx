import React, { useState } from 'react';
import GroupProfile from './GroupProfile';
import AddGroupMember from './AddGroupMember';
import RemoveGroupMember from './RemoveGroupMember';

const ManageGroupDetails = () => {
    const [activeTab, setActiveTab] = useState("add");

    return (
        <div role="tablist" className="tabs tabs-lifted tabs-lg w-full h-full">
            <input
                type="radio"
                name="my_tabs_2"
                role="tab"
                className="tab w-56"
                aria-label="Profile"
                onChange={() => setActiveTab("profile")}
            />
            <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-12 h-[92vh]">
                <GroupProfile />
            </div>

            <input
                type="radio"
                name="my_tabs_2"
                role="tab"
                className="tab"
                aria-label="Add Member"
                defaultChecked
                onChange={() => setActiveTab("add")}
            />
            <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6 h-[92vh]">
                <AddGroupMember isActive={activeTab === "add"} /> {/* will true to active */}
            </div>

            <input
                type="radio"
                name="my_tabs_2"
                role="tab"
                className="tab"
                aria-label="Remove Member"
                onChange={() => setActiveTab("remove")}
            />
            <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6 h-[92vh]">
                <RemoveGroupMember />
            </div>
        </div>
    );
};

export default ManageGroupDetails;

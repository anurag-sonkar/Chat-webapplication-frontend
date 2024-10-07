import React, { useState } from 'react';
import GroupProfile from './GroupProfile';
import AddGroupMember from './AddGroupMember';
import RemoveGroupMember from './RemoveGroupMember';

const ManageGroupDetails = () => {


    return (
        <div role="tablist" className="tabs tabs-lifted tabs-lg w-full">
            <input type="radio" name="my_tabs_2" role="tab" className="tab w-56" aria-label="Profile" defaultChecked />
            <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-12  h-[92vh]">
                <GroupProfile />
            </div>

            <input
                type="radio"
                name="my_tabs_2"
                role="tab"
                className="tab"
                aria-label="Add Member"
                 />
            <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6  h-[92vh]">
                <AddGroupMember />
            </div>

            <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Remove Member" />
            <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6  h-[92vh]">
               <RemoveGroupMember />
            </div>
        </div>
    );
};

export default ManageGroupDetails;

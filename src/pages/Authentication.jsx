import React, { useState } from 'react';
import { Tabs } from 'antd';
import Signup from '../components/Signup';

function Login() {
    return (
        <div>
            <h2>Login Form</h2>
            {/* Your Login Form JSX here */}
        </div>
    );
}



function Authentication() {

    return (
        <div className='auth'>
            <div className='w-[420px] min-h-[92vh] bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 py-1'>
                <div className='text-center'>
                    <Tabs
                        defaultActiveKey="1"
                        className="custom-tabs"
                    >
                        <Tabs.TabPane tab="Login" key="1">
                            <Login />
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Signup" key="2">
                            <Signup />
                        </Tabs.TabPane>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}

export default Authentication;

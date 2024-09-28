import React, { useState } from 'react';
import { Tabs } from 'antd';

function Login() {
    return (
        <div>
            <h2>Login Form</h2>
            {/* Your Login Form JSX here */}
        </div>
    );
}

function Signup() {
    return (
        <div>
            <h2>Signup Form</h2>
            {/* Your Signup Form JSX here */}
        </div>
    );
}

function Authentication() {
    const [size, setSize] = useState('small');

    return (
        <div className='auth'>
            <div className='w-[450px] h-[80vh] bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100'>
                <div className='text-center'>
                    <Tabs
                        defaultActiveKey="1"
                        size={size}
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

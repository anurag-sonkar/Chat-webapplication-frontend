import React, { useState } from 'react';
import { Tabs } from 'antd';
import Signup from '../components/Signup';
import { useSelector } from 'react-redux';
import Loading from '../components/Loading';

function Login() {
    return (
        <div>
            <h2>Login Form</h2>
            {/* Your Login Form JSX here */}
        </div>
    );
}



function Authentication() {
    const { isLoading } = useSelector(state => state.auth)

    return (
        <div className='auth relative'>
            {
                isLoading && <Loading />
            }
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

import React from 'react'
import { Dropdown, Space } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { BiLogOut } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { reset } from '../features/auth/authSlice';
import toast from 'react-hot-toast';


function ChatMenu({ children }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleLogout = () => {
        // loading start
        toast.loading("loading...", {
            id: "loading-toast",  // Set a specific ID to control this toast
            position: "top-right",
            autoClose: false,
            theme: "dark"
        });

        try {
            const user = localStorage.getItem("user-info")

            if (user) {
                localStorage.removeItem('user-info');

            }

            const selectedKey = localStorage.getItem('selectedKey')

            if (selectedKey) {

                localStorage.removeItem('selectedKey')
            }

            dispatch(reset())

                toast.dismiss("loading-toast");
                toast.success("logout successfully", {
                    position: "top-right",
                    autoClose: 4000,
                    theme: "dark"
                });
                navigate('/')
        } catch (error) {
            toast.dismiss("loading-toast");
            toast.error(error.message || 'logout failed', {
                position: "top-right",
                autoClose: 4000,
                theme: "dark"
            });

        }



    }
    const items = [
        {
            label: <div className='flex items-center gap-2'>
                <div><BiLogOut size={28} /></div>
                <div className='font-semibold' onClick={handleLogout}>Logout</div>
            </div>,
            key: '0',
        },
    ];
    return (
        <Dropdown
            menu={{
                items,
            }}
            trigger={['click']}
            placement="bottomRight"
            overlayStyle={{ marginTop: '-80px' }}
        >
            <a onClick={(e) => e.preventDefault()}>
                <Space>
                    {children}
                </Space>
            </a>
        </Dropdown>
    )
}

export default ChatMenu
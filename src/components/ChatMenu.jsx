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
    const handleLogout = async () => {
        toast.loading("loading...", {
            id: "loading-toast",
            position: "top-right",
            autoClose: false,
            theme: "dark"
        });

        try {
            localStorage.removeItem('user-info');
            localStorage.removeItem('selectedKey');

            await dispatch(reset());  // Await the reset action

            toast.dismiss("loading-toast");
            toast.success("Logout successful", {
                position: "top-right",
                autoClose: 4000,
                theme: "dark"
            });

            navigate('/');

        } catch (error) {
            toast.dismiss("loading-toast");
            toast.error(error.message || 'Logout failed', {
                position: "top-right",
                autoClose: 4000,
                theme: "dark"
            });
        }
    };

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
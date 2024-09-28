import React from 'react';
import { Flex, Spin } from 'antd';
const Loader = () => (
    <div className='w-full h-full grid place-items-center'>
        <Flex align="center" gap="middle">
            {/* <Spin size="small" /> */}
            {/* <Spin /> */}
            <Spin size="large" />
        </Flex>
    </div>
);
export default Loader;
import React from 'react'

function Loading({color}) {
    return (

        <span className={`loading loading-dots loading-lg bg-[${color !== undefined ? color : ""}]`}></span>
    )
}

export default Loading
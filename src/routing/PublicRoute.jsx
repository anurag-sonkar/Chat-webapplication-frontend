import React from 'react'
import { Navigate } from 'react-router-dom'

function PublicRoute({ children }) {
    const getUserFromLocalStorage = JSON.parse(localStorage.getItem('user-info'))
    // console.log(getUserFromLocalStorage)

    return (
        getUserFromLocalStorage !== null ? <Navigate to="/chat" /> : children
    )
}

export default PublicRoute
import React from 'react'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children }) {
    const getUserFromLocalStorage = JSON.parse(localStorage.getItem('user-info'))

    return (
        getUserFromLocalStorage?.token !== undefined ? children : <Navigate to="/"  />
    )
}

export default ProtectedRoute
import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const { token } = useContext(AppContext);

    if (token) {
        return children
    }
    return <Navigate to="/" />
}

export default ProtectedRoute

import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'

const Authoriser = ({children}) => {

    const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('user')))

    if(currentUser===null){
        return <Navigate to="/login" />
    }

    return children;
}

export default Authoriser
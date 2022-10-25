import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const Authoriser = ({children}) => {

    const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('user')))

    if(currentUser===null){
        Swal.fire({
            title: 'Please login to continue',
            icon: 'warning'
        })
        return <Navigate to="/login" /> 
    }

    return children;
}

export default Authoriser
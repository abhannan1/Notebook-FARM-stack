import React, { useEffect, useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import {  useLocation, useNavigate } from 'react-router-dom'


const Authenticated = (props) => {
    const navigate = useNavigate()
    const {children} = props
    const auth = useAuth()
    const [isVerified, setIsVerified] = useState(false)
    const location = useLocation()

    useEffect(()=>{
        if(!auth.isAuthenticated){
            navigate('/login', {replace:true, state:{from: location}})
        } else{
            setIsVerified(true)
        }

    },[auth.isAuthenticated, location, navigate])

if(!isVerified){
    return null
}

  return (
    <>{children}</>
  )
}

export default Authenticated
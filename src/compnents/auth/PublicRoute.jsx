import React, { useEffect, useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useLocation, useNavigate } from 'react-router-dom'


const PublicRoute = (props) => {
    const navigate = useNavigate()
    const {children} = props
    const auth = useAuth()
    const [isVerified, setIsVerified] = useState(true)
    const location = useLocation()

    useEffect(()=>{
        if(auth.isAuthenticated){
            navigate('/', {replace:true, state:{from: location}})
        } else{
            setIsVerified(false)
        }

    },[auth.isAuthenticated, location, navigate])

if(isVerified){
    return null
}

  return (
    <>{children}</>
  )
}

export default PublicRoute
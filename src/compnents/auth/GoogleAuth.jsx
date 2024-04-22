import { Button, Flex, Heading, Link } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';


export const GoogleAuth = () => {
    const navigate = useNavigate()

    const name = Cookies.get("name")
    const email = Cookies.get("email")
    const password = Cookies.get("password")
    const accessToken = Cookies.get("accessToken")
    const refreshToken = Cookies.get("refreshToken")
    const {handleForward} = useAuth()


    useEffect(()=>{
        const handleForwardRef = () => {
            const data = {
                user:{
                name,
                email,
                password,
                },
                refreshToken,
                accessToken
            }
            handleForward(data)
            navigate("/", {replace:true})
        }
        handleForwardRef()
    })

    
  return (
   null
  )
}

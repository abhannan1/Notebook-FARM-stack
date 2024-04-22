import React from 'react'
import {Button, Flex , FormControl, FormErrorMessage, Heading, Input, Text, useColorModeValue, useToast} from '@chakra-ui/react'
import {useForm} from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { ThemeToggler } from '../Theme/ThemeToggler'
import axiosInstance, { baseURL } from '../../services/axios'
import { GoogleLogo } from './Logos'
import axios from 'axios'


export const Register = () => {
const navigate = useNavigate()
const toast = useToast()
const location = useLocation()


const {
    handleSubmit, 
    register, 
    formState:{errors, isSubmitting}
  
  } = useForm()


  const onSubmit = async(values) =>{
    try {
      console.log(values);
      const response = await axiosInstance.post('/users/register', values)
      console.log(response?.data)
      toast({
        title: `Account created succesfully`,
        status:'success',
        isClosable:true,
        duration:1500
      })
      navigate('/login', {replace:true})
    } catch (error) {
      console.log(error)
      const err = error.response && error.response.data && error.response.data.detail
      toast({
        title: `${ err  || error?.message} `,
        status:'error',
        isClosable:true,
        duration:1500

      })
    }

  } 

  const handleGoogleAuth = async() =>{
    window.location.href = `${baseURL}/google/login`
  }

  return (
    <Flex 
    height='100vh'
    align='center'
    justifyContent='center'
    bgGradient={[
      'linear(to-tr, teal.300, yellow.400)',
      'linear(to-t, blue.200, teal.500)',
      'linear(to-b, orange.100, purple.300)',
    ]}    
    >
      <ThemeToggler 
      showLabel={true} 
      position='absolute'
      top={3}
      right={3}
      display='flex'
      flexDirection='row'
      alignItems='center'
      />
        <Flex
            direction='column'
            alignItems='center'
            background = {useColorModeValue('gray.300', 'gray.700')}
            // justifyContent='center'
            p={12}
            rounded={6}
        >
          <form onSubmit={handleSubmit(onSubmit)} 
          style={{justifyContent:'center', alignItems:'center', display:'flex', flexDirection:'column', width:'100%'}}
          >
            <Heading mb={6}>Register</Heading>
            
            <FormControl isInvalid= {errors.email}>
            <Input 
            placeholder='Enter your email address'
            background={useColorModeValue('gray.300', 'gray.600')}
            type='email'
            name='email'
            // size='lg'
            mt={6}
            {...register('email',{
              required: 'This is a required field'
            })}
            />
            <FormErrorMessage >
              {errors.email && errors.email.message}
            </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.username}>
              <Input
              placeholder='username'
              background={useColorModeValue('gray.300', 'gray.600')}
              type='username'
            //   size='lg'
              mt={6}
              {...register('username',{
                required: 'This is a required field',
                minLength:{
                    value:5,
                    message:'Username must contain atleast 5 characters'
                },
                maxLength:{
                    value:24,
                    message:'Username must be at most 24 characters'
                }

              })}
              />
              <FormErrorMessage >
                {errors.username && errors.username.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.password}>
              <Input
              placeholder='password'
              background={useColorModeValue('gray.300', 'gray.600')}
              type='password'
              width='100%'
            //   size='lg'
              mt={6}
              {...register('password',{
                required: 'This is a required field',
                minLength:{
                  value:6,
                  message:'password must contain atleast 6 characters'
                }
              })}
              />
              <FormErrorMessage >
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>
              <Button 
              isLoading={isSubmitting}
              loadingText='Logging in'
              width='100%'
              colorScheme='green'
              variant='outline'
              mt={6}
              type='submit'
              >Submit</Button>
            </form> 
              <Button
              onClick={handleGoogleAuth}
              width='100%'
              colorScheme='gray'
              variant='outline'
              mt={6}
              >
                <GoogleLogo marginRight={10}/>
                Sign In With Google
              </Button>
              <Text
              mt={6}
              >
                Already have an account? Login Here!
              </Text>
              <Button
              onClick={()=>navigate('/login', {replace:true})}
              width='100%'
              colorScheme='gray'
              variant='outline'
              mt={6}
              >
                Login Now
              </Button>
        </Flex>
    </Flex>
  )
}


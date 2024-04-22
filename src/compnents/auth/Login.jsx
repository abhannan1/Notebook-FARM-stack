import React from 'react'
import {Button, Flex , FormControl, FormErrorMessage, Heading, Input, Text, useColorModeValue, useToast} from '@chakra-ui/react'
import {useForm} from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { ThemeToggler } from '../Theme/ThemeToggler'
import { useAuth } from '../../hooks/useAuth'


export const Login = () => {
const navigate = useNavigate()
const {login} = useAuth()
const toast = useToast()

const {
    handleSubmit, 
    register, 
    formState:{errors, isSubmitting}
  
  } = useForm()


  const onSubmit = async(values) =>{
    const {email, password} = values
    try {
      await login(email, password)
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
            margin={4}
            p={12}
            rounded={6}
        >
          <form onSubmit={handleSubmit(onSubmit)} 
          style={{justifyContent:'center', alignItems:'center', display:'flex', flexDirection:'column',  width:'100%'}}
          >
            <Heading mb={6}>Login</Heading>
            
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

            <FormControl isInvalid={errors.password}>
              <Input
              placeholder='password'
              background={useColorModeValue('gray.300', 'gray.600')}
              type='password'
              // size='lg'
              mt={6}
              {...register('password',{
                required: 'This is a required field',
                minLength: {
                  value:5,
                  message:'Password must contain atleat 5 characters'
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
              <Text
              mt={6}
              >
                Don't have an account? Register Here!
              </Text>
              <Button
              onClick={()=>navigate('/Register', {replace:true})}
              width='100%'
              colorScheme='gray'
              variant='outline'
              mt={6}
              >
                Register Now
              </Button>
        </Flex>
    </Flex>
  )
}

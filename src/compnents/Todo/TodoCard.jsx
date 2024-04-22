import { Badge, Flex, Text, useColorModeValue } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

const TodoCard = (props) => {
    const {todo_id , title, status, description} = props?.todo
    const navigate = useNavigate()
  return (
    <Flex
    bg={useColorModeValue('gray.300', 'gray.600')}
    my={3}
    p={3}
    rounded='lg'
    alignItems='center'
    justifyContent='space-between'
    whiteSpace='nowrap'
    overflow='hidden'
    textOverflow='ellipsis'
    gap='0.5rem'
    _hover={{
        opacity:0.9,
        cursor:'pointer',
        transform:'translateY(-2px)'
    }}

    onClick={()=>{navigate(`/todo/${todo_id}`, {replace:true})}}
    >
        <Text fontWeight='bold' fontFamily='sans-serif'> {title}</Text>
        <Text overflow='hidden' textOverflow='ellipsis'>{description}</Text>
        <Badge
        colorScheme={status ? 'green' : 'red'}
        >
            {status ? 'Completed' :  'Pending'}
        </Badge>
    </Flex>
  )
}

export default React.memo(TodoCard)

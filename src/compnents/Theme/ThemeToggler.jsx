import React from 'react'
import {Box, FormLabel, Switch, useColorMode, } from '@chakra-ui/react'

export const ThemeToggler = ({showLabel = false,size, ...rest}) => {
     const {colorMode, toggleColorMode} =useColorMode()
  return (
    <Box {...rest}>
    {showLabel && (
        <FormLabel htmlFor='theme-toggler' mb={0} >
            Enable Dark Theme
        </FormLabel>
    )}

    <Switch
    id='theme-toggler'
    size= {size || 'sm'}
    isChecked={colorMode === 'dark'}
    isDisabled={false}
    colorScheme='green'
    value={colorMode}
    onChange={toggleColorMode}
    
    // {...rest}
    />

    </Box>
    )
}

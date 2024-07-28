import { Box, HStack, Heading, Stack, VStack } from '@chakra-ui/react'
import React from 'react'
import {DiGithub} from "react-icons/di"
import { RiLinkedinBoxLine } from "react-icons/ri";

const Footer = () => {
  return (
    <Box padding={'4'} bg={"blackAlpha.900"} minH={'10vh'}>
      <Stack direction={['column' , 'row']}>
        <VStack alignItems={['center' , 'flex-start']} width={"full"}>
          <Heading children="All Rights Reserved" color={'white'}/>
          <Heading
          fontFamily={'body'}
          size={'sm'}
          children="@Dheeraj_Kanukuntla"
          color="yellow.400"/>
        </VStack>

        <HStack spacing={["2","10"]} justifyContent={"center"} 
        color={"white"}
        fontSize={50}
        >
          <a href="https://www.linkedin.com/in/dheeraj-kanukuntla-62a108208" target={'blank'} rel="noopener noreferrer"><RiLinkedinBoxLine /></a>
          <a href="https://github.com/Dheeru01" target={'blank'} rel="noopener noreferrer"><DiGithub/></a>
          </HStack>
      </Stack>
    </Box>
  )
}

export default Footer
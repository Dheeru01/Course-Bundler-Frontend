import { Box, Button, Container, Heading, VStack, Text } from '@chakra-ui/react'
import React from 'react'
import { RiCheckboxCircleFill } from 'react-icons/ri'
import { useDispatch } from 'react-redux'
import {Link,useSearchParams} from 'react-router-dom'
import { loadUser } from '../../redux/actions/user'

const PaymentSuccess = () => {

  const reference = useSearchParams()[0].get("reference")
  const dispatch = useDispatch()

  return (
    <Container h={'90vh'} p={16}>
      <Heading my={8} textAlign={'center'}>
        You have Pro Pack
      </Heading>
      <VStack boxShadow={'lg'} pb={16} alignItems={'center'} borderRadius={"lg"} >
        <Box w={'full'} bg={'yellow.400'} p={4} css={{borderRadius: '8 8 0 0'}} >
          <Text color={"black"} >Payment Success</Text></Box>

        <Box p={4}>
          <VStack textAlign={'center'} px={8} mt={4} spacing={8}>
            <Text>
              Congratulation you're a pro member . You have access to premium content
            </Text>
            <Heading size={'4xl'}>
              <RiCheckboxCircleFill />
            </Heading>
          </VStack>
        </Box>
        <Link to="/profile">
          <Button onClick={() => dispatch(loadUser())} variant={'ghost'}>Go to Profile</Button>
        </Link>
        <Heading size={"xs"} > 
          Reference : {reference}
        </Heading>
      </VStack>
    </Container>
  )
}

export default PaymentSuccess
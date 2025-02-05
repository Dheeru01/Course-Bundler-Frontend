import { Button, Container, Heading, VStack} from '@chakra-ui/react'
import React from 'react'
import { RiErrorWarningFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'

const PaymentFailed = () => {
  return (
    <Container h={'90vh'}>
        <VStack justifyContent={'center'} h={'full'} spacing={4} >
            <RiErrorWarningFill size={'5rem'} />
      <Heading >
        Payment Fail
      </Heading>
      
        
        <Link to="/Home/CommunityAid">
          <Button variant={'ghost'}>Try Again</Button>
        </Link>
      </VStack>
    </Container>
  )
}

export default PaymentFailed
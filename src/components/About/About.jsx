import { Avatar, Container, Heading, Stack, VStack, Text, Button, Box, HStack } from '@chakra-ui/react'
import React from 'react'
import profile_1 from './profile_1.jpg'
import { Link } from 'react-router-dom'
import { RiSecurePaymentFill } from 'react-icons/ri'

const Founder = () => (
    <Stack direction={['column','row']} spacing={['4','16']} padding={8}>
        <VStack>
            <Avatar src={profile_1} boxSize={['40','48']} />
            <Text children="Founder" opacity={0.7} />
        </VStack>
        <VStack justifyContent={'center'} alignItems={['center','flex-start']} >
            <Heading children="Dheeraj" size={['md','xl']} />
            <Text 
                textAlign={['center','left']}
                children={"Hi , I am a full-stack developer . Our mission is to provide quality content at reasonable price."}
                />
        </VStack>
            
    </Stack>
)


const TandC = ({termsAndConditions})=>(
    <Box>
        <Heading size={'md'} children="Terms and Condition" textAlign={['center', 'left']} my={4}/>
        <Box h={'sm'} p={4}>
        <Text textAlign={['center','left']} letterSpacing={'widest'} fontFamily={'heading'} >{termsAndConditions}</Text>
        
        </Box>
    </Box>
)

const About = () => {
  return (
    <Container maxWidth={'container.lg'} padding={16} boxShadow={'lg'}>
        <Heading children="About Us" textAlign={['center','left']} />
        <Founder/>
        <Stack m={8} direction={['column','row']} alignItems={'center'} >
            <Text fontFamily={'cursive'} m={8} textAlign={['center', 'left']}>
            We are a video streaming platform with some premium courses available only for premium users.
                        </Text>

            <Link to={"/subscribe"}>
                <Button variant={'ghost'} colorScheme='yellow'>
                    Checkout Our Plan
                </Button>
            </Link>

        </Stack>

        <TandC termsAndConditions={"T&C Apply"} />

        <HStack>
            <RiSecurePaymentFill/>
            <Heading size={'xs'}
            fontFamily={'sans-serif'}
            textTransform={'uppercase'}
            children={'Payment is secured by Razorpay'}/>
        </HStack>
    </Container>

  )
}

export default About
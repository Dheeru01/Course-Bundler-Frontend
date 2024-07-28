import React from 'react'
import { Stack, VStack , Heading , Text , Button , Image , Box , HStack} from '@chakra-ui/react'
import './home.css'
import { Link } from 'react-router-dom'
import vg from '../../assets/images/bg.jpg'
import {CgGoogle , CgYoutube} from "react-icons/cg"
import {SiCoursera , SiUdemy} from "react-icons/si"
import {DiAws} from "react-icons/di"
import intro_1 from '../../assets/videos/intro_1.mp4'

const Home = () => {
  return (
    <section className='home'>
        <div className="container">
            <Stack
                direction={['column','row']}
                height='100%'
                justifyContent={['center','space-between']}
                alignItems='center'
                spacing={['16','56']}
            >
                <VStack width={'full'} alignItems={['center' , 'flex-end']} spacing={8}>
                    <Heading children="Learn from the experts" size={'2xl'} />
                    <Text 
                    fontFamily={'cursive'}
                    fontSize={'2xl'}
                    textAlign={['center' , 'left']}
                    children="Find Valuable content at reasonable price" />
                    <Link to = "/courses">
                        <Button size={"lg"} colorScheme="yellow" >Explore Now</Button>
                    </Link>
                </VStack>
                <Image className='vector-graphics' boxSize={'md'} src={vg} objectFit={"contain"}/>

            </Stack>
        </div>
        <Box padding={'8'} bg={"blackAlpha.800"}>
            <Heading textAlign={"center"} fontFamily={"body"} color={"yellow.400"} children="Our Brands" />
            <HStack className='brandsBanner' justifyContent={'space-evenly'} marginTop='4'>
                <CgGoogle />
                <CgYoutube />
                <SiCoursera />
                <SiUdemy />
                <DiAws />
                
            </HStack>
        </Box>

    <div className="container2">
        <video autoPlay controls controlsList='nodownload nofullscreen noremoteplayback' disablePictureInPicture disableRemotePlayback src={intro_1}></video>
    </div>

    </section>
  )
}

export default Home
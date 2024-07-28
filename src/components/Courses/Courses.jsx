import { Button, Container, HStack, Heading, Input, Stack, Text, VStack, Image } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCourses } from '../../redux/actions/course'
import toast from 'react-hot-toast'
import { addToPlaylist } from '../../redux/actions/profile'
import { loadUser } from '../../redux/actions/user'

const Course = ({views , title , imageSrc ,  id , addToPlayListHandler , creator , description , lectureCount, loading})=>{
    return(
        <VStack className='course' alignItems={['center' , 'flex-start']}>
            <Image src={imageSrc} boxSize="60" objectFit={"contain"} />
            <Heading
            textAlign={['center'  ,'left']}
            size={"sm"}
            maxW={"200px"}
            fontFamily={"sans-serif"}
            noOfLines={3}
            children={title} />
            <Text noOfLines={2} children={description}/>
            <HStack>
                <Text
                fontWeight={'body'}
                textTransform={"uppercase"}
                children={'Creator'}/>
                <Text
                fontWeight={'bold'}
                textTransform={"uppercase"}
                children={creator}/>
            </HStack>

            <Heading
                textAlign={'center'}
                size={'xs'}
                children={`Lectures - ${lectureCount}`}
                textTransform={"uppercase"}/>
            
            <Heading
                textAlign={'center'}
                size={'xs'}
                children={`Views - ${views}`}
                textTransform={"uppercase"}/>  

            <Stack direction={["column" , "row"]} alignItems={"center"}>
                <Link to={`/course/${id}`}>
                    <Button size={"sm"} colorScheme="yellow">Watch Now</Button>
                    </Link>
                    <Button isLoading={loading}  variant={"ghost"} size={"sm"} colorScheme="yellow" onClick={()=>addToPlayListHandler(id)} >Add To Playlist</Button>
            </Stack>
        </VStack>

    )
}
const Courses = () => {

    const [keyword, setKeyword] = useState('');
    const [category, setCategory] = useState('');
    //const [playList, setPlayList] = useState([]);
    const dispatch = useDispatch()
    
    const addToPlayListHandler = async (courseId) =>{
        await dispatch(addToPlaylist(courseId))
        dispatch(loadUser())
        //setPlayList([...playList , id])
    }

    const categories = ['Web Development' , 'Algorithms' , 'Data Structures & Algorithms' , 'App Dev' , " Data Science" , "Game Development" ]

    const {loading, courses, error,message} = useSelector(state => state.courses)

    useEffect(()=>{
        dispatch(getAllCourses(category, keyword))

        if(error){
            toast.error(error);
            dispatch({type: 'clearError'})
        }
        if(message){
            toast.success(message);
            dispatch({type: 'clearMessage'})
            
        }

    },[category, keyword, dispatch,error,message])

  return (
    <Container minH={'95vh'} maxW={"container.lg"} paddingY={'8'}>
        <Heading children="All Courses" m={'8'} />
        <Input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search a Course'
        type='text'
        focusBorderColor='yellow.500'
        />
        <HStack overflowX={'auto'} paddingY={"8"} css={{"&::-webkit-scrollbar":{display:"none"}}} >
            {categories.map((item , index)=>(
                <Button key={index} onClick={()=>setCategory(item)} minW={'60'}>
                <Text children={item} />
            </Button>
            ))}
        </HStack>
                <Stack
                direction={['column',"row"]}
                flexWrap="wrap"
                justifyContent={['flex-start' , 'space-evenly']}
                alignItems={['center' , 'flex-start']}
                >
                    {
                        courses.length>0 ? 
                         courses.map((item)=>(
                            <Course
                                key={item._id}
                                title={item.title}
                                description={item.description}
                                views={item.views}
                                creator={item.createdBy}
                                imageSrc={item.poster.url}
                                lectureCount={item.numOfVideos}
                                id={item._id}
                                addToPlayListHandler={addToPlayListHandler}
                                loading={loading}
                            />
                        )):<Heading opacity={0.5} mt={4} children="No Courses Found" />
                    }
                </Stack>
    </Container>
    
    
  )
}

export default Courses
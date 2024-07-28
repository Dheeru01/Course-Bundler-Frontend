import { Box, Button, Container, FormLabel, Heading, Input, Textarea, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { courseRequest } from '../../redux/actions/others';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

const Requests = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [course, setCourse] = useState('');

    const dispatch = useDispatch()
    const {loading , message , error} = useSelector(state=>state.others)

    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(courseRequest(name,email,course))
    }

    useEffect(()=>{
        if(error){
            toast.error(error)
            dispatch({type:"clearError"})
        }
        if(message){
            toast.success(message)
            dispatch({type:"clearMessage"})
        }
    },[dispatch,message,error])

  return (
    <Container my={'95px'}>
        <VStack h={"full"} justifyContent={'center'} spacing={16} >
            <Heading children={"Request New Course"} />
            <form onSubmit={submitHandler} style={{width: '100%'}}>

            <Box my={4}>
            <FormLabel htmlFor='name' children="Name"/>
            <Input required
            id='name'
            value={name}
            onChange={e=>setName(e.target.value)}
            placeholder='Enter Your Name'
            type='text'
            focusBorderColor='yellow.500'/>
            </Box>
            
            <Box my={4}>
            <FormLabel htmlFor='email' children="Email Address"/>
            <Input required
            id='email'
            value={email}
            onChange={e=>setEmail(e.target.value)}
            placeholder='abc@gmail.com'
            type='email'
            focusBorderColor='yellow.500'/>
            </Box>

            <Box my={4}>
            <FormLabel htmlFor='course' children="Course"/>
            <Textarea required
            id='course'
            value={course}
            onChange={e=>setCourse(e.target.value)}
            placeholder='Explain the Course....'
            focusBorderColor='yellow.500'/>
            </Box>

            <Button isLoading={loading} my={4} colorScheme='yellow' type='submit'>Send Mail</Button>

            <Box my={4}>
                See available Courses!{' '}
                <Link to={'/courses'}>
                    <Button colorScheme='yellow' variant={'link'}>
                        Click
                    </Button>{' '}
                    here
                </Link>
            </Box>
            </form>
        </VStack>
    </Container>
  )
}

export default Requests
import { Button, Container, VStack, Input, Heading } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { forgetPassword } from '../../redux/actions/profile'
import toast from 'react-hot-toast'

const ForgotPassword = () => {

    const [email, setEmail] = useState('')

    const dispatch = useDispatch()
    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(forgetPassword(email))
    }

    const { loading , message , error } = useSelector(state => state.profile);

  useEffect(()=>{
    if(error){
      toast.error(error)
      dispatch({type:'clearError'})
    }
    if(message){
      toast.success(message)
      dispatch({type:'clearMessage'})
    }
  },[dispatch,error,message])


  return (
    <Container py={16} h={'90vh'}>
        <form onSubmit={submitHandler} >
            <Heading 
            children={'Forgot Password'}
            my={16}
            textTransform = {"uppercase"}
            textAlign = {['center', 'left']}
            />

            <VStack spacing={8} >
            <Input required
            id='email'
            value={email}
            onChange={e=>setEmail(e.target.value)}
            type='email'
            placeholder='abc@gmail.com'
            focusBorderColor='yellow.500'/>

            <Button isLoading={loading} type='submit' colorScheme='yellow' w={'full'}>
                Send Reset Link </Button>
            </VStack>
        </form>
    </Container>
  )
}

export default ForgotPassword
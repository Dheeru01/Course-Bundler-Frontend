import { Button, Container, VStack, Input, Heading } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { resetPassword } from '../../redux/actions/profile';
import toast from 'react-hot-toast';

const ResetPassword = () => {

    const [password, setPassword] = useState('');
    const params = useParams();
    const navigate = useNavigate()

        const { loading , message , error } = useSelector(state => state.profile);
        const dispatch = useDispatch()

    const submitHandler = (e)=>{
        e.preventDefault();
        dispatch(resetPassword(params.token,password))
    }

  useEffect(()=>{
    if(error){
      toast.error(error)
      dispatch({type:'clearError'})
    }
    if(message){
      toast.success(message)
      dispatch({type:'clearMessage'})
      navigate('/login')
    }
  },[dispatch,error,message])



  return (
    <Container py={16} h={'90vh'}>
        <form onSubmit={submitHandler} >
            <Heading 
            children={'Reset Password'}
            my={16}
            textTransform = {"uppercase"}
            textAlign = {['center', 'left']}
            />

            <VStack spacing={8} >
            <Input required
            
            value={password}
            onChange={e=>setPassword(e.target.value)}
            type='password'
            placeholder='Enter New Password'
            focusBorderColor='yellow.500'/>

            <Button isLoading={loading} type='submit' colorScheme='yellow' w={'full'}>
                Reset Password</Button>
            </VStack>
        </form>
    </Container>
  )
}

export default ResetPassword
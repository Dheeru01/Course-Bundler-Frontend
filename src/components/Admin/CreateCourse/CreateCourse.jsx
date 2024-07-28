import { useDispatch, useSelector } from 'react-redux'
import { Grid, Container, Heading, VStack, Input, Select, Button, Image} from '@chakra-ui/react'
import React, { useEffect } from 'react'
import cursor from '../../../assets/images/cursor.jpeg'
import Sidebar from '../Sidebar'
import { useState } from 'react'
import { fileUploadCss } from '../../Auth/Register'
import { createCourse } from '../../../redux/actions/admin'
import { loadUser } from '../../../redux/actions/user'
import toast from 'react-hot-toast'


const CreateCourse = () => {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState("")
    const [createdBy, setCreatedBy] = useState("")
    const [category, setCategory] = useState("")
    const [imagePrev, setImagePrev] = useState("")

    const categories = ['Web Development' , 'Algorithms' , 'Data Structures & Algorithms' , 'App Dev' , " Data Science" , "Game Development" ]

    const changeImageHandler = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImagePrev(reader.result);
            setImage(file);
        };
    }

    const dispatch = useDispatch(); 

    const {loading, message, error} = useSelector(state => state.admin)

    const submitHandler = (e) => {
        e.preventDefault();
        const myForm = new FormData()

        myForm.append('title', title)
        myForm.append('description', description)
        myForm.append('category', category)
        myForm.append('createdBy', createdBy)
        myForm.append('file', image)


        dispatch(createCourse(myForm));
        setTitle("")
        setDescription("")
        setCategory("")
        setCreatedBy("")
        setImage("")

        //send data to backend
    } 
    
    useEffect(() => {
        if(error){
            toast.error(error)
            dispatch({type: "clearError"})
        }
        if(message){
            toast.success(message)
            dispatch({type: "clearMessage"})
        }
    }, [dispatch, error, message])

  return (
    <Grid
    css={{
        cursor: `url(${cursor}), default`,
    }}
    minH={'100vh'}
    templateColumns={['1fr', '5fr 1fr']}
    >

        <Container py={16}>
            <form onSubmit={submitHandler} >
                <Heading
                textTransform={'uppercase'}
                children={"Create Course"}
                my={16}
                textAlign={['center','left']}/>

                <VStack m="auto" spacing={8}>
                <Input          
                    value={title}
                    onChange={e=>setTitle(e.target.value)}
                    placeholder='Title'
                    type={'text'}
                    focusBorderColor='purple.300'/>
                <Input          
                    value={description}
                    onChange={e=>setDescription(e.target.value)}
                    placeholder='Description'
                    type={'text'}
                    focusBorderColor='purple.300'/>
                <Input          
                    value={createdBy}
                    onChange={e=>setCreatedBy(e.target.value)}
                    placeholder='Creator Name'
                    type={'text'}
                    focusBorderColor='purple.300'/>
                
                <Select
                    focusBorderColor='purple.300'
                    value={category}
                    onChange={e=>setCategory(e.target.value)}>
                        <option value={""}>Category</option>
                        {categories.map(item => (
                        <option key={item} value={item}>{item}
                        </option>
                        ))}

                    </Select>
                    <Input accept='image/*'
                        id='chooseAvatar'
                        type={'file'}
                        focusBorderColor='yellow.500'
                        css={{'&::file-selector-button':{
                            ...fileUploadCss,
                            color:'purple',
                        }}}
                        onChange={changeImageHandler}/>
                        {imagePrev && (
                    <Image src={imagePrev} boxSize="64" objectFit={'contain'} />)}
                    <Button isLoading={loading} w="full" colorScheme={"purple"} type="submit">Create</Button>
                    
                </VStack>
            </form>
        </Container>


    <Sidebar />
    </Grid>
  )
}

export default CreateCourse
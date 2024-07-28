import { Grid, Box, Heading, TableContainer, Table, TableCaption, Thead, Tr, Th, Button, HStack, Td, Tbody } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import cursor from '../../../assets/images/cursor.jpeg'
import Sidebar from '../Sidebar'
import { RiDeleteBin7Fill } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, getAllUsers, updateUserRole } from '../../../redux/actions/admin'
import { toast } from 'react-hot-toast'


const Users = () => {

  const {users, loading, error , message} = useSelector(state => state.admin)
  const dispatch = useDispatch()

  const updateHandler = async (userId) => {
    await(dispatch(updateUserRole(userId)))
    dispatch(getAllUsers())

  }
  const deleteButtonHandler = async (userId) => {
    await(dispatch(deleteUser(userId)))
    dispatch(getAllUsers())
    
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
    dispatch(getAllUsers())

  },[dispatch,error,message])

  return (
    <Grid
    css={{
        cursor: `url(${cursor}), default`,
    }}
    minH={'100vh'}
    templateColumns={['1fr', '5fr 1fr']}
    >

    <Box p={["0","16"]} overflowX="auto" >
      <Heading textTransform={'uppercase'}
                children={"All Users"}
                my="16"
                textAlign={['center','left']}/>
      <TableContainer w={['"100vw',"full"]}>
        <Table variant={"simple"} size={"lg"}>
          <TableCaption>All available users in the database</TableCaption>
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Role</Th>
              <Th>Subscription</Th>
              <Th isNumeric>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users &&
              users.map(item=>(
                <Row loading={loading} updateHandler={updateHandler} deleteButtonHandler={deleteButtonHandler} key={item._id} item={item} />
              ))
            }
          </Tbody>

        </Table>
        </TableContainer>          


    </Box>

    <Sidebar />
    </Grid>
  )
}

export default Users;

function Row({item, updateHandler, deleteButtonHandler,loading}){
  return (
    <Tr>
      <Td>{item._id}</Td>
      <Td>{item.name}</Td>
      <Td>{item.email}</Td>
      <Td>{item.role}</Td>
      <Td>{item.subscription && item.subscription.status === 'active' ? 'Active':'Not Active'}</Td>
      <Td isNumeric>
        <HStack justifyContent={"flex-end"}>
          <Button isLoading={loading} onClick={()=>updateHandler(item._id)}
            variant={'outline'} color="purple.500">Change Role</Button>
          <Button isLoading={loading} color={'purple.600'} onClick={()=>deleteButtonHandler(item._id)} >
            <RiDeleteBin7Fill />
          </Button>
        </HStack>
      </Td>
    </Tr>
  )
}
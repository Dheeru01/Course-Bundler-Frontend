import React from 'react'
import {ColorModeSwitcher} from '../../../ColorModeSwitcher'
import { Link } from 'react-router-dom';
import {Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, HStack, VStack, useDisclosure} from "@chakra-ui/react"
import { RiDashboardFill, RiLogoutBoxLine, RiMenu5Fill } from "react-icons/ri";
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/actions/user';

const LinkButton = ({url='/',title="Home" , onClose})=>(
  <Link onClick={onClose} to={url}>
    <Button variant={'ghost'}>{title}</Button>
  </Link>
)



const Header = ({isAuthenticated=false, user}) => {

  const {isOpen,onOpen,onClose} = useDisclosure()

  const dispatch = useDispatch()  

  const logoutHandler = ()=>{
    onClose();
    dispatch(logout())
  }
  

  return (
    <div>
        <ColorModeSwitcher/>
        <Button 
          onClick={onOpen}
            colorScheme="yellow"
            width={12}
            height={12}
            rounded={'full'}
            position={'fixed'}
            zIndex={'overlay'}
            top={6}
            left={6}
        >
            <RiMenu5Fill />
        </Button>
        <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay backdropFilter={'blur(1.5px)'} />
            <DrawerContent>
              <DrawerHeader borderBottomWidth={1} >COURSE BUNDLER</DrawerHeader>
              <DrawerBody>
                <VStack spacing={4} alignItems='flex-start' >
                  <LinkButton onClose={onClose} url='/' title="Home"/>
                  <LinkButton onClose={onClose} url='/courses' title="Browse All Courses"/>
                  <LinkButton onClose={onClose} url='/request' title="Request a Course"/>
                  <LinkButton onClose={onClose} url='/contact' title="Contact Us"/>
                  <LinkButton onClose={onClose} url='/about' title="About Us"/>

                  <HStack
                  justifyContent={'space-evenly'}
                  position={'absolute'}
                  bottom={'2rem'}
                  width={'100%'}
                  >
                    {isAuthenticated?(<>
                    <VStack>
                      <HStack>
                        <Link onClick={onClose} to='/profile'>
                          <Button variant={'ghost'} colorScheme='yellow'>Profile</Button>
                        </Link>
                        <Link to='/login' onClick={onClose}>
                          <Button variant={'ghost'} onClick={logoutHandler} ><RiLogoutBoxLine/>Logout</Button>
                        </Link>
                      
                      </HStack>
                      {user && user.role==="admin" && <Link to='/admin/dashboard' onClick={onClose}>
                        <Button colorScheme='purple' variant={'ghost'} >
                          <RiDashboardFill style={{margin:"4px"} }/>Dashboard</Button>
                          </Link>
                      }
                    </VStack>
                    </>):(<>
                    
                      <Link onClick={onClose} to='/login'>
                      <Button colorScheme='yellow'>Login</Button>
                      </Link>
                      <p>OR</p>
                      <Link onClick={onClose} to='/register'>
                      <Button colorScheme='yellow'>Sign Up</Button>
                    </Link>
                      
                    </>)}
                  </HStack>
                </VStack>
              </DrawerBody>
            </DrawerContent>

        </Drawer>
    </div>
  )
}

export default Header
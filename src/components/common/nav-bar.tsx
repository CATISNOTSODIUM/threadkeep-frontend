import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  Stack,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'


const Links = ["Home", "Threads", "Profile"];
const Urls = ["/", "/threads", "/profile"];
const NavLink = ({index, navigate}) => {
  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: 'gray.700',
      }}
      onClick={() => navigate(Urls[index])}
      className="cursor-pointer"
    >
      {Links[index]}
    </Box>
  )
}

export default function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate = useNavigate();
  return (
    <div className="fixed w-full z-50 top-0 start-0 text-white">
      <Box bg='gray.900' px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box>
              <div 
                className="text-2xl lg:text-3xl my-3 text-wrap cursor-pointer" id="logo"
                onClick={() => navigate("/")}
              >
                ThreadKeep ⬢{" "}
              </div>
            </Box>
            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
              {Links.map((_, index) => (
                <NavLink index={index} navigate={navigate} key={index}/>
              ))}
            </HStack>
          </HStack>

        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((_,index) => (
                <NavLink index={index} navigate={navigate} key={index}/>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </div>
  )
}


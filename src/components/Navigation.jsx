"use client";

import {
  Flex,
  useColorModeValue,
  Box,
  Spacer,
  Icon,
  useColorMode,
  Menu,
  MenuItem,
  MenuButton,
  MenuList,
  Avatar,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { LuMoon, LuSun } from "react-icons/lu";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import gravatar from "gravatar";
import { Link } from "@chakra-ui/next-js";

export function Navigation({ session }) {
  const queryClient = useQueryClient();
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleSignOut = async () => {
    queryClient.removeQueries();
    await supabase.auth.signOut();
    router.refresh();
  };

  const gravatarUrl = gravatar.url(session?.user?.email);

  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue("gray.100", "gray.900");
  const color = useColorModeValue("black", "white");

  return (
    <Box
      bg={bg}
      color={color}
      align="center"
      borderBottom={1}
      borderStyle="solid"
      minH="60px"
      py={{ base: 2 }}
      px={{ base: 4 }}
      borderColor={useColorModeValue("gray.200", "gray.900")}
    >
      <Flex width={{ base: "full", lg: "1024px" }} alignItems="center">
        <Box p="2">
          <Link href="/">YourBrand</Link>
        </Box>
        <Spacer />

        <Flex gap={2} display={{ base: "none", md: "flex" }}>
          <Link px={2} href="/about">
            About
          </Link>
          <Link px={2} href="/services">
            Services
          </Link>
          <Link px={2} href="/contact">
            Contact
          </Link>
        </Flex>
        <Spacer />

        <Flex gap="2" alignItems="center">
          <Icon
            cursor="pointer"
            onClick={toggleColorMode}
            as={colorMode === "light" ? LuMoon : LuSun}
          />

          <Menu>
            <MenuButton>
              <Avatar name={session?.user?.email} src={gravatarUrl} size="sm" />
            </MenuButton>
            <MenuList>
              <MenuItem as={Link} href="/settings">
                Settings
              </MenuItem>
              <MenuItem as={Link} href="/notifications">
                Notifications
              </MenuItem>

              <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
  // return (
  //   <Navbar expand="lg" className="bg-body-tertiary">
  //     <Container>
  //       <Navbar.Brand href="/" as={Link}>
  //         Supademo
  //       </Navbar.Brand>
  //       <Navbar.Toggle aria-controls="basic-navbar-nav" />
  //       <Navbar.Collapse id="basic-navbar-nav">
  //         <Nav className="me-auto">
  //           <Nav.Link href="/companies" as={Link}>
  //             Companies
  //           </Nav.Link>
  //         </Nav>
  //         {session && (
  //           <Nav>
  //             <NavDropdown
  //               title={
  //                 <Image
  //                   src={gravatarUrl}
  //                   roundedCircle
  //                   width={30}
  //                   height={30}
  //                   alt="User profile picture"
  //                 />
  //               }
  //               drop="down"
  //               align="end"
  //             >
  //               <NavDropdown.Item href="/notifications">
  //                 Notifications
  //               </NavDropdown.Item>
  //               <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
  //               <NavDropdown.Divider />
  //               <NavDropdown.Item onClick={handleSignOut}>
  //                 Sign out
  //               </NavDropdown.Item>
  //             </NavDropdown>
  //           </Nav>
  //         )}
  //       </Navbar.Collapse>
  //     </Container>
  //   </Navbar>
  // );
}

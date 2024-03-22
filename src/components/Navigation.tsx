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
    <Flex
      bg={bg}
      color={color}
      borderBottom={1}
      borderStyle="solid"
      minH="60px"
      justifyContent="center"
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
          <Link px={2} href="/companies">
            Companies
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

          {session && (
            <Menu>
              <MenuButton>
                <Avatar
                  name={session?.user?.email}
                  src={gravatarUrl}
                  size="sm"
                />
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
          )}
        </Flex>
      </Flex>
    </Flex>
  );
}

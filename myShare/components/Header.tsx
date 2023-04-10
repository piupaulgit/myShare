import { Avatar, Box, HStack, Icon, IconButton, StatusBar, Text } from 'native-base';
import React from 'react';

const Header = () => {
  return (
    <>
      <StatusBar />
      <HStack
        px="1"
        justifyContent="space-between"
        alignItems="center"
        w="100%">
        <HStack alignItems="center">
          <Text>Back</Text>
        </HStack>
        <HStack>
            <Avatar bg="cyan.500">PP</Avatar>
        </HStack>
      </HStack>
    </>
  );
};

export default Header;

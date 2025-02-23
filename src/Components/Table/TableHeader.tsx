import { User } from '../../types';
import { flexRender, Header } from '@tanstack/react-table';
import { Box, Flex, IconButton, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import { FaArrowDown, FaArrowUp, FaEllipsisVertical } from 'react-icons/fa6';



export default function TableHeader({
    header,
}: {
    header: Header<User, unknown>;  
}){ 
    const isSorted = header.column.getIsSorted();

    return (
        <th style={{ width: header.getSize(), position: "relative" }} colSpan={header.colSpan}>
            <Menu>
                <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<FaEllipsisVertical />}
                style={{
                    position:"absolute",
                    right: 4,
                    top: 10,
                    color: 'black'
                }}
                className='menu'
                size='xs'
                colorScheme={"whiteAlpha"}
                />
                <MenuList color="black"> 
                <MenuItem
                  onClick={header.column.getToggleSortingHandler()}
                  fontSize="sm"
                >
                  {isSorted === "desc" ? "Sort Asc" : "Sort Desc"}
                 
                </MenuItem>
              </MenuList>
            </Menu>
            <Flex justifyContent={"center"} gap={1} alignItems="center">
                <Text fontSize="s">
                    {header.isPlaceholder 
                    ? null 
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </Text>
                {isSorted && <Box> {isSorted === "desc" && <FaArrowUp />}
                {isSorted === "asc" && <FaArrowDown />}
                </Box>}
            </Flex>
        </th>
    )
}
import React from 'react'

import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react"
import { STATUSES } from '../data';

const StatusCell = ({getValue, row, column, table}) => {
    const {name, color} = getValue() || {};
    const {updateData} = table.options.meta;

  return (
    <Menu
    isLazy
    offset={[
        0, 0
    ]}
    flip={false}
    autoSelect={false}
    >
        <MenuButton
            h="100%"
            w="100%"
            textAlign="left"
            p={1.5}
            bg={color || "transparent"}
            color="gray.900"
        >
            {name}
        </MenuButton>
        <MenuList>
            { STATUSES.map((status)=>(
                     <MenuItem
                     onClick={
                         () => updateData(
                             row.index, column.id, status
                         )
                     }
                     key={status.id}
                     >{status.name}</MenuItem>
            ))}
        </MenuList>
    </Menu>
  )
}

export default StatusCell


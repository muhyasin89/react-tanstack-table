import { Checkbox, Flex, IconButton, Image } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import moment from "moment";
import { useMemo, useState } from "react";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa6";
import { USERS } from "../../data";
import { User } from "../../types";
import Table from "./Table";

const DISPLAY_COLUMN_SIZE = 100;

const columnHelper = createColumnHelper<User>();

export const useTableData = () => {
  const [data, setData] = useState(USERS);

  const columns = useMemo(() => [
   
    columnHelper.display({
      id: "selection",
      header: <Flex justifyContent={"center"} alignItems="center">
        <Checkbox onChange={table.getToggleAllRowSelecthandler()}/>
      </Flex>,
      cell: <Flex justifyContent={"center"} alignItems="center">
        <Checkbox />
        </Flex>
    }),
    columnHelper.accessor("id", {
      id: "id",
      header: "ID", 
    }),
    columnHelper.accessor("name", {
      id: "name",
      header: "Name", 
    }),
    columnHelper.accessor("avatar", {
      id: "avatar",
      header: "Avatar",
      cell: ({getValue}) => <Flex alignItems={"center"} justifyContent="center">
        <Image src={getValue()} width="50px" height="50px" borderRadius={"50"}/>
      </Flex>
    }),
    columnHelper.accessor("email", {
      id: "email",
      header: "Email", 
    }),
    columnHelper.accessor("birthDate", {
      id: "birthDate",
      header: "Birth Date",
      cell: ({ getValue}) => moment(getValue()).format("DD/MM/YYYY") 
    }),
    columnHelper.accessor("age", {
      id: "age",
      header: "Age",
      size: DISPLAY_COLUMN_SIZE,
      footer: ({table}) => table.getFilteredRowModel().rows.reduce((acc, value) => {
        acc += Number(value.getValue('age'))
        return acc;
      }, 0)
    }),
    columnHelper.display({
      id: "delete",
      header: 
      <Flex justifyContent={"center"} alignItems="center">
        <FaTrash />
      </Flex>,
      cell: 
      <IconButton 
      aria-label="Delete row" 
      icon={<FaTrash />} 
      colorScheme="red" 
      size="xs"/>,
    }),
  ], [])

  return { columns, data}
};
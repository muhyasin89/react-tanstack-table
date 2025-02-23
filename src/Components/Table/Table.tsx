import {
    flexRender,
    getCoreRowModel,

    getSortedRowModel,
    useReactTable,
  } from "@tanstack/react-table";
  import "./index.css";
  import { User } from "../../types";
  import { Box, Flex } from "@chakra-ui/react";
  
  import { useTableData } from "./useTableData";

  
  export default function Table() {
    const { columns, data } = useTableData();
    const table = useReactTable<User>({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    return (
        <Flex width="100vw">
          <Flex height="98vh" direction={"column"} gap={2} p={2} grow="1">
            <Flex alignItems={"center"}>
         
            </Flex>
    
            <Box flex="1" overflow="auto">
              <table style={{ overflow: "auto"}}>
                <thead>
                  {table.getHeaderGroups().map(headerGroup =>{
                    return <tr>{headerGroup.headers.map(header=>{
                      return <th>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</th>
                    })}</tr>
                  })}
                </thead>
              </table>
            </Box>
            <Box>
             
            </Box>
          </Flex>
        </Flex>
      );
    }
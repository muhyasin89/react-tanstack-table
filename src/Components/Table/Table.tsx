import {
  flexRender,
  getCoreRowModel,

  getFilteredRowModel,

  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import "./index.css";
import { User } from "../../types";
import { Box, Flex, Input } from "@chakra-ui/react";
import Pagination from "./Pagination";

import { useTableData } from "./useTableData";
import TableHeader from "./TableHeader";
import { fuzzyFilter } from "./Table.utils";
import RowDetailView from "./RowDetailView";
import { ColumnVisibilitySelector } from "./ColumnVisibilitySelector";

  
  export default function Table() {
    const { columns, data, initialColumnVisibility, columnIds } = useTableData();
    const table = useReactTable<User>({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        filterFns: {
          fuzzy: fuzzyFilter,
        },
        globalFilterFn: fuzzyFilter,
        getPaginationRowModel: getPaginationRowModel(),
        enableRowSelection: true,
        getRowCanExpand: () => true,

        initialState: {
          columnVisibility: initialColumnVisibility,
          columnOrder: columnIds,
        }
    });

    return (
        <Flex width="100vw">
          <Flex height="98vh" direction={"column"} gap={2} p={2} grow="1">
            <Flex alignItems={"center"}>
              <ColumnVisibilitySelector table={table} columnIds={columnIds} />
              <Input 
                ml={2}
                onChange={(e) => table.setGlobalFilter(e.target.value)}
                width="300px"
                placeholder="..."
                />
            </Flex>
    
            <Box flex="1" overflow="auto">
              <table style={{ overflow: "auto"}}>
              <thead style={{ position: "sticky", top: 0, zIndex: 2 }}>
                  {table.getHeaderGroups().map(headerGroup =>{
                    return <tr>
                      {headerGroup.headers.map(header=>{
                      return <TableHeader header={header} />
                    })}</tr>
                  })}
                </thead>

                <tbody>
                  {
                    table.getRowModel().rows.map(row => {
                      return (
                        <>
                        <tr style={{
                          background: row.getIsSelected() ? '#161654' : '',
                          color: row.getIsSelected() ? 'white' : 'black'
                        }}>
                        {row.getVisibleCells().map(cell => {
                        return <td>{ 
                          flexRender(
                          cell.column.columnDef.cell, 
                          cell.getContext()
                        ) }</td>
                      })}</tr>
                      {row.getIsExpanded() && (<tr>
                          <td colSpan={row.getVisibleCells().length}>
                          <RowDetailView user={row.original} />
                          </td>
                        </tr>)}
                        </>
                      )
                    })
                  }
                </tbody>

                <tfoot style={{ position: "sticky", top: 0, zIndex: 2 }}>
                  {table.getFooterGroups().map(footerGroup =>{
                    return <tr>{footerGroup.headers.map(footer=>{
                      return <td>
                        {footer.isPlaceholder 
                        ? null 
                        : flexRender(
                          footer.column.columnDef.footer, 
                          footer.getContext()
                        )}</td>
                    })}</tr>
                  })}
                </tfoot>
              </table>
            </Box>
            <Box>
              <Pagination table={table} />
            </Box>
          </Flex>
        </Flex>
      );
    }
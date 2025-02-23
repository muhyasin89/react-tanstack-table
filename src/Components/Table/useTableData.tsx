import { Checkbox, Flex, IconButton, Image } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import moment from "moment";
import { useMemo, useState } from "react";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa6";
import { USERS } from "../../data";
import { User } from "../../types";

const DISPLAY_COLUMN_SIZE = 100;

const columnHelper = createColumnHelper<User>();

export const useTableData = () => {
  const [data, setData] = useState(USERS);

  const columns = useMemo(
    () => [
    ], [])
  return { columns, data}
};
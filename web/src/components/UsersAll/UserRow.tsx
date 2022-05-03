import React, { FunctionComponent, useState } from "react";

import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import UserDetailsExpanded from "./UserDetailsExpanded";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { IUserRestRaw } from "../../services/UsersService/model";

interface UserRowProps {
  user: IUserRestRaw;
}

const UserRow: FunctionComponent<UserRowProps> = (props) => {
  const { user } = props;
  const [open, setOpen] = useState<boolean>(false);

  return (
    <React.Fragment>
      <TableRow
      // sx={{ "& > *": { borderBottom: "unset" } }}
      // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <KeyboardArrowUpIcon fontSize="small" />
            ) : (
              <KeyboardArrowDownIcon fontSize="small" />
            )}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          user.name
        </TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>{user.phone}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <UserDetailsExpanded />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default UserRow;

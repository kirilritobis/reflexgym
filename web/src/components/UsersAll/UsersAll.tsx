import React, { FunctionComponent } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";

import "./UsersAll.css";
import UserRow from "./UserRow";
import TextField from "@mui/material/TextField";

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
  price: number
) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      {
        date: "2020-01-05",
        customerId: "11091700",
        amount: 3,
      },
      {
        date: "2020-01-02",
        customerId: "Anonymous",
        amount: 1,
      },
    ],
  };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0, 3.99),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3, 4.99),
  createData("Eclair", 262, 16.0, 24, 6.0, 3.79),
  createData("Cupcake", 305, 3.7, 67, 4.3, 2.5),
  createData("Gingerbread", 356, 16.0, 49, 3.9, 1.5),
];

interface UsersAllProps {}

const UsersAll: FunctionComponent<UsersAllProps> = () => {
  return (
    <Container maxWidth="lg" className="all-users-container">
      <TableContainer component={Paper} className="all-users-table">
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Имена</TableCell>
              <TableCell align="right">Телефон</TableCell>
              <TableCell align="right">Имейл</TableCell>
            </TableRow>
            <TableRow>
              <TableCell />
              <TableCell>
                <TextField
                  placeholder="търси..."
                  variant="standard"
                  InputProps={{
                    disableUnderline: true,
                  }}
                />
              </TableCell>
              <TableCell align="right">
                <TextField
                  placeholder="търси..."
                  variant="standard"
                  sx={{ input: { textAlign: "right" } }}
                  InputProps={{
                    disableUnderline: true,
                  }}
                />
              </TableCell>
              <TableCell align="right">
                <TextField
                  placeholder="търси..."
                  variant="standard"
                  sx={{ input: { textAlign: "right" } }}
                  InputProps={{
                    disableUnderline: true,
                  }}
                />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <UserRow key={row.name} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default UsersAll;

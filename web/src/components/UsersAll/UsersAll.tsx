import React, {
  ChangeEvent,
  FunctionComponent,
  useEffect,
  useState,
} from "react";

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
import { getAll } from "../../services/UsersService/UsersService";
import { IUserRestRaw } from "../../services/UsersService/model";

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
  const [allUsers, setAllUsers] = useState<Array<IUserRestRaw>>([]);
  const [displayedUsers, setDisplayedUsers] = useState<Array<IUserRestRaw>>([]);
  const [searchByName, setSearchByName] = useState<string>("");
  const [searchByEmail, setSearchByEmail] = useState<string>("");
  const [searchByPhone, setSearchByPhone] = useState<string>("");

  useEffect(() => {
    (async () => {
      const allUsers = await getAll();
      setAllUsers(allUsers);
      setDisplayedUsers(allUsers);
    })();
  }, []);

  const handleSearchByName = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = event.target;
    setSearchByName(value);
    filterUsers(value, searchByEmail, searchByPhone);
  };

  const handleSearchByEmail = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = event.target;
    setSearchByEmail(value);
    filterUsers(searchByName, value, searchByPhone);
  };

  const handleSearchByPhone = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = event.target;
    setSearchByPhone(value);
    filterUsers(searchByName, searchByEmail, value);
  };

  const filterUsers = (name: string, email: string, phone: string) => {
    const filteredUsers = allUsers.filter((user) => {
      // console.log(user.email.includes(email));
      console.log(user.phone.includes(phone));
      // console.log(phone);
      // user.name.includes(name) &&
      return (
        (email ? user.email.includes(email) : true) &&
        (phone ? user.phone.includes(phone) : true)
      );
    });

    setDisplayedUsers(filteredUsers);
  };

  return (
    <Container maxWidth="lg" className="all-users-container">
      <TableContainer component={Paper} className="all-users-table">
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Имена</TableCell>
              <TableCell>Имейл</TableCell>
              <TableCell>Телефон</TableCell>
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
                  value={searchByName}
                  onChange={(e) => handleSearchByName(e)}
                />
              </TableCell>
              <TableCell>
                <TextField
                  placeholder="търси..."
                  variant="standard"
                  // sx={{ input: { textAlign: "right" } }}
                  InputProps={{
                    disableUnderline: true,
                  }}
                  value={searchByEmail}
                  onChange={(e) => handleSearchByEmail(e)}
                />
              </TableCell>
              <TableCell>
                <TextField
                  placeholder="търси..."
                  variant="standard"
                  // sx={{ input: { textAlign: "right" } }}
                  InputProps={{
                    disableUnderline: true,
                  }}
                  value={searchByPhone}
                  onChange={(e) => handleSearchByPhone(e)}
                />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedUsers.map((user) => (
              <UserRow key={user.uId} user={user} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default UsersAll;

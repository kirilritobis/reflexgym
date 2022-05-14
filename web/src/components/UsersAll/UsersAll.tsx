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

interface UsersAllProps {}

const UsersAll: FunctionComponent<UsersAllProps> = () => {
  const [allUsers, setAllUsers] = useState<Array<IUserRestRaw>>([]);
  const [displayedUsers, setDisplayedUsers] = useState<Array<IUserRestRaw>>([]);
  const [searchByCardNumber, setSearchByCardNumber] = useState<string>("");
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

  const handleSearchByCardNumber = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { value } = event.target;
    setSearchByCardNumber(value);
    filterUsers(value, searchByName, searchByEmail, searchByPhone);
  };

  const handleSearchByName = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = event.target;
    setSearchByName(value);
    filterUsers(searchByCardNumber, value, searchByEmail, searchByPhone);
  };

  const handleSearchByEmail = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = event.target;
    setSearchByEmail(value);
    filterUsers(searchByCardNumber, searchByName, value, searchByPhone);
  };

  const handleSearchByPhone = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = event.target;
    setSearchByPhone(value);
    filterUsers(searchByCardNumber, searchByName, searchByEmail, value);
  };

  const filterUsers = (
    cardNumber: string,
    name: string,
    email: string,
    phone: string
  ) => {
    const filteredUsers = allUsers.filter((user) => {
      const userFullName =
        `${user.firstName} ${user.lastName}`.toLocaleLowerCase();
      const userEmail = user.email.toLocaleLowerCase();
      return (
        (cardNumber ? user.cardNumber.includes(cardNumber) : true) &&
        (name ? userFullName.includes(name.toLocaleLowerCase()) : true) &&
        (email ? userEmail.includes(email.toLocaleLowerCase()) : true) &&
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
              <TableCell>Номер на карта</TableCell>
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
                  value={searchByCardNumber}
                  onChange={(e) => handleSearchByCardNumber(e)}
                />
              </TableCell>
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

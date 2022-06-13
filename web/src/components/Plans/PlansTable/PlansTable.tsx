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
import { getAllPlans } from "../../../services/OrganizationService/OrganizationService";
import "./PlansTable.css";

const PlansTable: FunctionComponent<{}> = () => {
  const [allPlans, setAllPlans] = useState<any>([]);

  useEffect(() => {
    (async () => {
      const allPlansRest = await getAllPlans();
      setAllPlans(allPlansRest);
    })();
  }, []);

  return (
    <TableContainer component={Paper} className="plans-table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Име</TableCell>
            <TableCell align="right">Месеци</TableCell>
            <TableCell align="right">Цена</TableCell>
            <TableCell align="right">Посещения</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allPlans.map((row: any) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.months}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">
                {row.visits ? row.visits : "-"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PlansTable;

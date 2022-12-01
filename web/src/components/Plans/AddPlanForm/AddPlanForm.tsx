import React, {
  ChangeEvent,
  FunctionComponent,
  useEffect,
  useState,
} from "react";
import "date-fns";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import TextField from "@mui/material/TextField";
import { createPlan } from "../../../services/OrganizationService/OrganizationService";

const AddPlanForm: FunctionComponent<{}> = () => {
  const [startingDate, setStartingDate] = useState<Date | null>(new Date());
  const [price, setPrice] = useState<string>("");
  const [months, setMonths] = useState<string>("");
  const [visits, setVisits] = useState<string>("");

  const handlePriceChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setPrice(event.currentTarget.value);
  };

  const handleMonthsChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setMonths(event.currentTarget.value);
  };

  const handleVisitsChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setVisits(event.currentTarget.value);
  };

  const handleCreatePlan = async (): Promise<void> => {
    await createPlan(startingDate!, price, months, visits);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justifyContent="center" flex-diraction="column">
        <Grid>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Date picker inline"
            value={startingDate}
            onChange={(date: Date | null) => setStartingDate(date)}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </Grid>
        <Grid>
          <TextField
            id="standard-basic"
            label="Price"
            variant="standard"
            onChange={handlePriceChange}
          />
        </Grid>
        <Grid>
          <TextField
            id="standard-basic"
            label="Months"
            variant="standard"
            onChange={handleMonthsChange}
          />
        </Grid>
        <Grid>
          <TextField
            id="standard-basic"
            label="Visits"
            variant="standard"
            onChange={handleVisitsChange}
          />
        </Grid>
        <Grid>
          <button onClick={handleCreatePlan}>create</button>
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  );
};

export default AddPlanForm;

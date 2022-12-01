import React, { FunctionComponent, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { getAllPlans } from "../../../services/OrganizationService/OrganizationService";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface ChargeCardDialogProps {
  isOpen: boolean;
  setOpen: Function;
}

const ChargeCardDialog: FunctionComponent<ChargeCardDialogProps> = (props) => {
  const [allPlans, setAllPlans] = useState<any>([]);
  const [selectedPlan, setSelectedPlan] = useState<string>("");

  useEffect(() => {
    (async () => {
      const allPlansRest = await getAllPlans();
      console.log(allPlans);
      setAllPlans(allPlansRest);
    })();
  }, []);

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleSelectPlan = () => {};

  return (
    <div>
      <Dialog open={props.isOpen} onClose={handleClose}>
        <DialogTitle>Зареди карта</DialogTitle>
        <DialogContent>
          <DialogContentText>Избери план:</DialogContentText>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={"asd"}
              label="Age"
              onChange={handleSelectPlan}
            >
              {/* {allPlans.map((plan) => {})} */}
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Зареди</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ChargeCardDialog;

import React, { FunctionComponent, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface UserDialogProps {
  userCardNumber: string;
  setUserCardNumber: Function;
}

const UserDialog: FunctionComponent<UserDialogProps> = (props) => {
  const handleClose = () => {
    props.setUserCardNumber("");
  };

  return (
    <div>
      <Dialog open={!!props.userCardNumber} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <img
            className="expanded-user-picture"
            src="https://scontent.fsof10-1.fna.fbcdn.net/v/t31.18172-8/13415451_10205010226333838_6876085943965916846_o.jpg?_nc_cat=104&ccb=1-6&_nc_sid=174925&_nc_ohc=8YO_SW4lMOcAX8fWnt3&_nc_ht=scontent.fsof10-1.fna&oh=00_AT9Fe8kIKgeYd3hi8CP_GKUHP1l0niqXBa4EO6lS41o4dg&oe=629B2897"
            alt="photo"
            width="200"
          ></img>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserDialog;

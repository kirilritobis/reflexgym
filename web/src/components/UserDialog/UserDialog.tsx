import React, { FunctionComponent, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { loadUserByCardNumber } from "../../services/UsersService/UsersService";

interface UserDialogProps {
  userCardNumber: string;
  setUserCardNumber: Function;
}

const UserDialog: FunctionComponent<UserDialogProps> = (props) => {
  const [userDetails, setUserDetails] = useState<any>({});

  useEffect(() => {
    (async () => {
      if (props.userCardNumber) {
        const userDetails = await loadUserByCardNumber(props.userCardNumber);
        setUserDetails(userDetails[0]);
      }
    })();
  }, [props.userCardNumber]);

  const handleClose = () => {
    props.setUserCardNumber("");
  };

  return (
    <div>
      <Dialog
        open={!!props.userCardNumber}
        onClose={handleClose}
        keepMounted={false}
      >
        <DialogTitle>{`${userDetails.firstName} ${userDetails.lastName}`}</DialogTitle>
        <DialogContent>
          <img
            className="expanded-user-picture"
            src={userDetails.profilePic}
            alt="photo"
            width="200"
          ></img>
          <div>Имейл: {userDetails.email}</div>
          <div>Телефон: {userDetails.phone}</div>
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

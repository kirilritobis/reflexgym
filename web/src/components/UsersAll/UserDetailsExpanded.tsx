import { Button } from "@mui/material";
import React, { FunctionComponent, useEffect, useState } from "react";
import {
  loadUserByCardNumber,
  uploadImage,
} from "../../services/UsersService/UsersService";

import "./UserDetailsExpanded.css";

interface UsersExpandedProps {
  cardNumber: string;
}

const UserDetailsExpanded: FunctionComponent<UsersExpandedProps> = (props) => {
  const [userDetails, setUserDetails] = useState<any>({});

  useEffect(() => {
    (async () => {
      const userDetails = await loadUserByCardNumber(props.cardNumber);
      setUserDetails(userDetails[0]);
    })();
  }, []);

  const handleImageAdd = async (files: FileList | null) => {
    const file = files![0];
    const imageFile = new FormData();
    imageFile.append("image", file);
    await uploadImage(imageFile);
  };
  console.log(userDetails);
  return (
    <div className="expanded-user-container">
      <img
        className="expanded-user-picture"
        src="http://localhost:8001/123.jpeg"
        alt="photo"
        width="200"
      ></img>
      <div className="expanded-user-info">
        <div>email: {userDetails.email}</div>
        <div>phone: {userDetails.phone}</div>
        <Button variant="contained" component="label">
          Upload File
          <input
            type="file"
            hidden
            onChange={(event) => handleImageAdd(event.target.files)}
          />
        </Button>
      </div>
    </div>
  );
};

export default UserDetailsExpanded;

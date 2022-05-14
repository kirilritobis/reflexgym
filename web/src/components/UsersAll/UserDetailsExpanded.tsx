import { Button } from "@mui/material";
import React, { FunctionComponent, useEffect, useState } from "react";
import { uploadImage } from "../../services/UsersService/UsersService";

import "./UserDetailsExpanded.css";

interface UsersExpandedProps {
  userId: string;
}

const UserDetailsExpanded: FunctionComponent<UsersExpandedProps> = (props) => {
  useEffect(() => {}, []);

  const handleImageAdd = async (files: FileList | null) => {
    const file = files![0];
    console.log(file.type);
    const imageFile = new FormData();
    imageFile.append("image", file);
    await uploadImage(imageFile);
  };
  return (
    <div className="expanded-user-container">
      {/* <img
        className="expanded-user-picture"
        src={image}
        alt="photo"
        width="200"
      ></img> */}
      <div className="expanded-user-info">
        <div>email: </div>
        <div>phone: </div>
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

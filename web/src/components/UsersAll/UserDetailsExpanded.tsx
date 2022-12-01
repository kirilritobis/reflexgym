import { Button } from "@mui/material";
import React, { FunctionComponent, useEffect, useState } from "react";
import { getAllPlans } from "../../services/OrganizationService/OrganizationService";
import {
  loadUserByCardNumber,
  uploadImage,
} from "../../services/UsersService/UsersService";
import ChargeCardDialog from "./ChargeCardDialog/ChargeCardDialog";

import "./UserDetailsExpanded.css";

interface UsersExpandedProps {
  cardNumber: string;
}

const UserDetailsExpanded: FunctionComponent<UsersExpandedProps> = (props) => {
  const [userDetails, setUserDetails] = useState<any>({});
  const [isLoadCardDialogOpened, setIsLoadCardDialogOpened] =
    useState<boolean>(false);

  useEffect(() => {
    (async () => {
      if (props.cardNumber) {
        const userDetails = await loadUserByCardNumber(props.cardNumber);
        setUserDetails(userDetails[0]);
      }
    })();
  }, [props.cardNumber]);

  const handleImageAdd = async (files: FileList | null) => {
    const file = files![0];
    const imageFile = new FormData();
    imageFile.append("image", file);
    await uploadImage(imageFile);
  };

  return (
    <div className="expanded-user-container">
      <img
        className="expanded-user-picture"
        src={userDetails.profilePic}
        alt="photo"
        width="200"
      ></img>
      <div className="expanded-user-info">
        <div>Имейл: {userDetails.email}</div>
        <div>Телефон: {userDetails.phone}</div>
        <div>Дата на регистрация: </div>
        <div>Последно посещение: </div>
        <Button variant="contained" component="label">
          Upload File
          <input
            type="file"
            hidden
            onChange={(event) => handleImageAdd(event.target.files)}
          />
        </Button>
        <div>Дата на зареждане: {userDetails.chargedOn}</div>
        <div>Валидна до: {userDetails.expiresOn}</div>
        <div>
          валидация на карта: {userDetails.expired ? "НЕВАЛИДНА" : "ВАЛИДНА"}
        </div>
        <Button
          variant="contained"
          onClick={() => setIsLoadCardDialogOpened(true)}
        >
          Зареди карта
        </Button>
        <ChargeCardDialog
          setOpen={setIsLoadCardDialogOpened}
          isOpen={isLoadCardDialogOpened}
        />
      </div>
    </div>
  );
};

export default UserDetailsExpanded;

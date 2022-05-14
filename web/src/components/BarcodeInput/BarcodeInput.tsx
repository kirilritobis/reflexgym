import { Button } from "@mui/material";
import React, {
  FunctionComponent,
  useEffect,
  useState,
  ChangeEvent,
} from "react";
import {
  loadUserByCardNumber,
  uploadImage,
} from "../../services/UsersService/UsersService";
import UserDialog from "../UserDialog/UserDialog";
import { TextField } from "@mui/material";

import "./BarcodeInput.css";

interface BarcodeInputProps {}

const BarcodeInput: FunctionComponent<BarcodeInputProps> = (props) => {
  const [userCardNumberInput, setUserCardNumberInput] = useState<string>("");
  const [userCardNumber, setUserCardNumber] = useState<string>("");
  const input = document.getElementById("barcode-input");
  document.addEventListener("keypress", () => {
    input?.focus();
  });

  const handleBarcodeScannerInput = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUserCardNumberInput(event.currentTarget.value);
  };

  const onKeyPressBarcodeInput = async (
    event: React.KeyboardEvent<HTMLDivElement>
  ): Promise<void> => {
    if (event.key === "Enter") {
      await loadUserByCardNumber(userCardNumberInput);
      setUserCardNumber(userCardNumberInput);
    }
  };

  return (
    <>
      <TextField
        label="Barcode"
        variant="standard"
        id="barcode-input"
        onFocus={() => setUserCardNumberInput("")}
        onChange={(e) => handleBarcodeScannerInput(e)}
        onKeyDown={(e) => onKeyPressBarcodeInput(e)}
        value={userCardNumberInput}
      />
      <UserDialog
        userCardNumber={userCardNumber}
        setUserCardNumber={setUserCardNumber}
      />
    </>
  );
};

export default BarcodeInput;

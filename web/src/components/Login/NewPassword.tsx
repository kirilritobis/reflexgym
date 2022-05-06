import React, { FunctionComponent, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

interface NewPasswordProps {}

const NewPassword: FunctionComponent<NewPasswordProps> = () => {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="Hello World"
        />
        <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="Hello World"
        />
      </div>
    </Box>
  );
};

export default NewPassword;

import React, { FunctionComponent } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import TableRowsIcon from "@mui/icons-material/TableRows";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const Sidebar: FunctionComponent<{}> = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          <ListItem key={1} disablePadding>
            <ListItemButton onClick={() => navigate("/home")}>
              <ListItemIcon>
                <TableRowsIcon />
              </ListItemIcon>
              <ListItemText primary={"Таблица"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={1} disablePadding>
            <ListItemButton onClick={() => navigate("/plans")}>
              <ListItemIcon>
                <CreditScoreIcon />
              </ListItemIcon>
              <ListItemText primary={"Планове"} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

export default Sidebar;

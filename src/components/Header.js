import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import image from "./assets/imgs/tigeen_computing_logo.png";
import { useSelector } from "react-redux";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import Drawer from "@mui/material/Drawer";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import "./ProgressSteps/step.scss";

export default function Header() {
  const data = useSelector((e) => e.users);
  const { logo, preset, leftDrawer, rightDrawer, drawerOverlay } = data;
  const [state, setState] = React.useState({
    top: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (drawerOverlay) {
      if (
        event.type === "keydown" &&
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    } else {
    }
  };
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  return (
    <Box
      sx={{ flexGrow: 1 }}
      className={`${preset === "blue" ? "blue" : "red"}`}
    >
      <AppBar position="static" sx={{ boxShadow: "none" }} className="header">
        <Toolbar variant="string">
          {["left"].map((anchor) => (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              {leftDrawer ? (
                <MenuIcon onClick={toggleDrawer(anchor, true)} />
              ) : (
                <></>
              )}
              <Drawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
              >
                {list(anchor)}
              </Drawer>
            </IconButton>
          ))}
          {logo === "disable" ? (
            <Box sx={{ width: "100%" }}></Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                width: "100%",
                height: "35px",
                justifyContent:
                  logo === "left"
                    ? "flex-start"
                    : logo === "right"
                    ? "flex-end"
                    : logo === "center"
                    ? "center"
                    : "",
              }}
            >
              <Box
                sx={{
                  minWidth: "13rem",
                  backgroundImage: `url(${image})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  position: "relative",
                  backgroundSize: "contain",
                }}
              ></Box>
            </Box>
          )}
          {["right"].map((anchor) => (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              {rightDrawer ? (
                <MenuIcon onClick={toggleDrawer(anchor, true)} />
              ) : (
                <></>
              )}
              <Drawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
              >
                {list(anchor)}
              </Drawer>
            </IconButton>
          ))}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

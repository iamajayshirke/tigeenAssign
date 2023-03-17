import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import EmailIcon from '@mui/icons-material/Email';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import Drawer from "@mui/material/Drawer";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useSelector } from "react-redux";

export default function Footer() {
  const data =  useSelector(e=>e.users)
  const [value, setValue] = React.useState(0);
  const {leftDrawer, rightDrawer, drawerOverlay } = data;
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          boxShadow: "none",
          backgroundColor: "#616161",
          position: "fixed",
          bottom: 0,
        }}
      >
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
          {data.bottomMenu?<Box sx={{ width: "100%" }}>
            <Tabs value={value} onChange={handleChange} centered sx={{'& .MuiTab-root':{
                minHeight:"auto",
                color:"#ffffff"
            },
            '& .MuiTab-root.Mui-selected':{
                fontWeight:700,
                color:'#ffffff'
            },
            " & .MuiTabs-indicator":{
                backgroundColor:'#ffffff',
                height:"3px",
                top:1
            }
            }}>
              <Tab icon={<EmailIcon />} label="Mails" iconPosition="start" />
              <Tab icon={<AccessAlarmIcon />} label="Alarms" iconPosition="start"/>
              <Tab icon={<MovieCreationIcon />} label="Movies" iconPosition="start"/>
            </Tabs>
          </Box>:<Box sx={{width:'100%'}}></Box>}
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

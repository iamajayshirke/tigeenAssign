import {useState} from "react";
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
import { useSelector } from "react-redux";

export default function Footer() {
  const data =  useSelector(e=>e.users)
  const [value, setValue] = useState(0);

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
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            {data.leftDrawer?<MenuIcon />:""}
          </IconButton>
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
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            {data.rightDrawer?<MenuIcon />:<></>}
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

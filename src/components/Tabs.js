import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";

function TabPanel(props) {
 
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }} >
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const data =  useSelector(e=>e.users);
  const { preset} = data;
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }} className={`${preset === "blue" ? "blue" : "red"}`}>
      <Box sx={{  borderColor: "divider" ,bgcolor: 'primary.main'}}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="full width tabs example"
          sx={{'& .Mui-selected':{
            color: "#ffffff !important" ,
            fontWeight:'700 !important',
          } , '& .MuiTabs-indicator':{
            backgroundColor:"white",
            height:"3px"
          }}}
        >
          <Tab label="Tab One" {...a11yProps(0)} sx={{color:"white",fontSize:"small"}}/>
          <Tab label="Tab Two" {...a11yProps(1)} sx={{color:"white",fontSize:"small"}}/>
          <Tab label="Tab Three" {...a11yProps(2)} sx={{color:"white",fontSize:"small"}}/>
        </Tabs>
      </Box>
    </Box>
  );
}

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import image from "./assets/imgs/tigeen_computing_logo.png";
import { useSelector } from "react-redux";
import "./ProgressSteps/step.scss"

export default function Header() {
  const data = useSelector((e) => e.users);
  const { logo,preset } = data;
  return (
    <Box sx={{ flexGrow: 1 }} className={`${preset === "blue" ? "blue":'red'}`}>
      <AppBar position="static" sx={{ boxShadow: "none" }} className='header'>
        <Toolbar variant="string">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            {data.leftDrawer ? <MenuIcon /> : <></>}
          </IconButton>
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
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, ml: 2 }}
          >
            {data.rightDrawer ? <MenuIcon /> : <></>}
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

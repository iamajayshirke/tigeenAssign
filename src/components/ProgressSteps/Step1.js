import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import SettingsIcon from "@mui/icons-material/Settings";
import EditIcon from "@mui/icons-material/Edit";
import ModeStandbyIcon from "@mui/icons-material/ModeStandby";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import PropTypes from "prop-types";
import { Divider } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import Switch from "@mui/material/Switch";
import { useDispatch, useSelector } from "react-redux";
import { toggleSwitch } from "./switchSlice";
import "./step.scss";

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 136deg, #1976d2 0%, #1976d2 50%, rgb(138,35,135) 100%)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 136deg, #1976d2 0%, #1976d2 50%, rgb(138,35,135) 100%)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 30,
  height: 30,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundImage:
      "linear-gradient( 136deg, #1976d2 0%, #1976d2 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    backgroundImage:
      "linear-gradient( 136deg, #1976d2 0%, #1976d2 50%, rgb(138,35,135) 100%)",
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <EditIcon fontSize="small" />,
    2: <SettingsIcon fontSize="small" />,
    3: <ModeStandbyIcon fontSize="small" />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const steps = ["", "", ""];

export default function HorizontalLinearStepper() {
  const dispatch = useDispatch();
  const updatedData = useSelector((e) => e.users);
  const [state, setState] = React.useState({
    header: true,
    footer: true,
    drawerOverlay: true,
    leftDrawer: true,
    rightDrawer: true,
    navTab: true,
    bottomMenu: true,
    logo: "left",
    preset: "blue",
  });

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  React.useEffect(() => {
    dispatch(toggleSwitch(state));
  }, [state]);


  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };


  const handleReset = () => {
    setActiveStep(0);
  };

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };
  const handleLogoPosition = (event) => {
    setState({
      ...state,
      logo: event.target.value,
    });
  };
  const handleColorPreset = (event) => {
    setState({
      ...state,
      preset: event.target.value,
    });
  };
  // const switchBase = {
  //   "& .MuiSwitch-switchBase.Mui-checked": {
  //     color: `${updatedData.preset === "blue" ? "blue" : "red"}`,
  //   },
  // };

  // const switchTrack = {"& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
  // {
  //   backgroundColor: `${
  //     updatedData.preset === "blue" ? "blue" : "red"
  //   }`,
  // }}

  return (
    <Box
      sx={{ width: "100%" }}
      className={`${updatedData.preset === "blue" ? "blue" : "red"}`}
    >
      <Stepper activeStep={activeStep} connector={<ColorlibConnector />}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel
                {...labelProps}
                StepIconComponent={ColorlibStepIcon}
              ></StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <Divider sx={{ mb: 3, mt: 2 }} />
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
          {activeStep === 0 ? (
            <Box sx={{ p: 2 }}>
              {/* Logo Setter */}
              <Box className="logoSetter">
                <FormControl>
                  <Typography>I want Company logo</Typography>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={state.logo}
                    onChange={handleLogoPosition}
                  >
                    <FormControlLabel
                      value="left"
                      control={<Radio size="small" className="radio" />}
                      label="Left"
                    />
                    <FormControlLabel
                      value="right"
                      control={<Radio size="small" />}
                      label="Right"
                    />
                    <FormControlLabel
                      value="center"
                      control={<Radio size="small" />}
                      label="Center"
                    />
                    <FormControlLabel
                      value="disable"
                      control={<Radio size="small" />}
                      label="Disable"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
              {/* ColorPresets */}
              <Box className="colorPreset">
                <FormControl>
                  <Typography>Color Preset</Typography>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={state.preset}
                    onChange={handleColorPreset}
                  >
                    <FormControlLabel
                      value="blue"
                      control={<Radio size="small" />}
                      label="Blue (#1976d2)"
                    />
                    <FormControlLabel
                      value="red"
                      control={
                        <Radio
                          size="small"
                          sx={{
                            color: "#ff0000",
                            "&.Mui-checked": {
                              color: "#ff0000 !important",
                            },
                          }}
                        />
                      }
                      label="Red (#ff0000)"
                    />
                  </RadioGroup>
                </FormControl>
                <Typography sx={{ fontSize: "0.8rem" }}>
                  Preset Apply only: Header Background, Button, Radio Button and
                  Switch
                </Typography>
              </Box>
              {/* Toggles */}
              <Box className="blue" sx={{ mt: 2 }}>
                <FormControl component="fieldset" variant="standard">
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={state.header}
                          onChange={handleChange}
                          name="header"
                          size="small"
                        />
                      }
                      label="I want a Header"
                      sx={{
                        "& .MuiFormControlLabel-label": {
                          fontSize: "0.9rem",
                          ml: 1,
                        },
                      }}
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={state.footer}
                          onChange={handleChange}
                          name="footer"
                          size="small"
                        />
                      }
                      label="I want a Footer"
                      sx={{
                        "& .MuiFormControlLabel-label": {
                          fontSize: "0.9rem",
                          ml: 1,
                        },
                      }}
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={state.drawerOverlay}
                          onChange={handleChange}
                          name="drawerOverlay"
                          size="small"
                        />
                      }
                      label="I want a Drawer Overlay Mode (Requires Header or Footer)"
                      sx={{
                        "& .MuiFormControlLabel-label": {
                          fontSize: "0.9rem",
                          ml: 1,
                        },
                      }}
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={state.leftDrawer}
                          onChange={handleChange}
                          name="leftDrawer"
                          size="small"
                        />
                      }
                      label="I want a left side drawer"
                      sx={{
                        "& .MuiFormControlLabel-label": {
                          fontSize: "0.9rem",
                          ml: 1,
                        },
                      }}
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={state.rightDrawer}
                          onChange={handleChange}
                          name="rightDrawer"
                          size="small"
                        />
                      }
                      label="I want a right side drawer"
                      sx={{
                        "& .MuiFormControlLabel-label": {
                          fontSize: "0.9rem",
                          ml: 1,
                        },
                      }}
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={state.navTab}
                          onChange={handleChange}
                          name="navTab"
                          size="small"
                        />
                      }
                      label="I want a navigation tabs (Requires Header)"
                      sx={{
                        "& .MuiFormControlLabel-label": {
                          fontSize: "0.9rem",
                          ml: 1,
                        },
                      }}
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={state.bottomMenu}
                          onChange={handleChange}
                          size="small"
                          name="bottomMenu"
                        />
                      }
                      label="I want a Bottom Menu (Requires Footer)"
                      sx={{
                        "& .MuiFormControlLabel-label": {
                          fontSize: "0.9rem",
                          ml: 1,
                        },
                      }}
                    />
                  </FormGroup>
                </FormControl>
              </Box>
            </Box>
          ) : activeStep === 1 ? (
            <Box>Second Box</Box>
          ) : activeStep === 2 ? (
            <Box>Third Box</Box>
          ) : (
            <></>
          )}
          <Divider />
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            {/* <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button> */}
            

            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? (
                <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-start",
                }}
              >
                <Button variant="contained" className="btnSubmit">Finish</Button>
              </Box>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-start",
                  }}
                >
                  <Button variant="contained" className="btnSubmit">Continue</Button>
                </Box>
              )}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}

import React, { useEffect, useState, useReducer, useRef } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { TRACKLIST_URL } from "./constants";

import { initialState, reducer } from "./configReducer";
import {
  getTwitchConfig,
  setTwitchConfig,
  getBroadcaster,
  authInit,
} from "./TwitchApi";
import {
  Panel,
  Content,
  CostConfigWrapper,
  ButtonStyled,
  ConfigForm,
  ConfigActions,
  GameConfig,
  GeneralConfig,
} from "./Config.styled";
import CostsConfig from "./CostsConfig";
import BannedControl from "./BannedControl";
import Spinner from "./Spinner";

function TabPanel({ children, value, index, ...other }) {
  return (
    <Panel
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Content p={3}>{children}</Content>}
    </Panel>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.palette.background.paper,
  },
}));

const Config = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const initialConfigSet = useRef(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getAlertMsg = (type) => {
    return type === "success"
      ? "Dados Salvos com sucesso"
      : "Erro ao salvar dados";
  };

  const handleClose = () => {
    dispatch({ type: "setAlert", payload: "" });
  };
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  useEffect(() => {
    if (state.auth) {
      getBroadcaster()
        .then((response) => response.json())
        .then((data) => {
          dispatch({
            type: "setBroadcasterType",
            payload: data.broadcasterType,
          });
        })
        .catch((err) => console.log(err));
    }
  }, [state.auth]);

  useEffect(() => {
    getTwitchConfig((config) => {
      if (config) {
        dispatch({ type: "setConfig", payload: config });
        console.log("configOBJ:", config);
      } else {
        const config = {
          extremeCost: 5,
          bannedCost: 10,
          bannedIds: [],
          unlimited: true,
          game: "2021",
        };
        setTwitchConfig(config, () =>
          dispatch({ type: "setConfig", payload: config })
        );
      }
      if (initialConfigSet.current) {
        // avisa se setou aqui
        console.log("salvou");
      } else {
        initialConfigSet.current = true;
      }
    });

    authInit((authentication) =>
      dispatch({ type: "setAuth", payload: authentication })
    );
  }, []);

  useEffect(() => {
    fetch(TRACKLIST_URL)
      .then((raw) => raw.json())
      .then((data) => {
        let songs = [];
        Object.keys(data).map((key) => {
          songs = songs.concat(data[key]);
          return false;
        });

        dispatch({ type: "setSongList", payload: songs });
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const SaveChangedData = () => {
    const config = {
      extremeCost: state.config.extremeCost,
      bannedCost: state.config.bannedCost,
      bannedIds: Object.keys(state.bannedSongs),
      unlimited: state.config.unlimited,
      game: state.config.game,
    };
    setTwitchConfig(config, () =>
      dispatch({ type: "setAlert", payload: "success" })
    );
    window.Twitch.ext.send("broadcast", "application/json", {
      type: "configChange",
      data: config,
    });
  };

  const updateConfig = (data) => {
    console.log(data);
    dispatch({ type: "setConfig", payload: { ...state.config, ...data } });
  };

  return state.config && state.broadcasterType ? (
    <div className={classes.root}>
      <ConfigForm>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="Just dance tracklist config"
          >
            <Tab label="General" {...a11yProps(0)} />
            <Tab label="Banned Songs" {...a11yProps(1)} />
          </Tabs>
        </AppBar>

        <TabPanel value={value} index={0}>
          <GeneralConfig>
            <GameConfig>
              <a href="http://localhost:3000/auth/twitch" target="_blank">
                auth
              </a>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Game</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={state.config.game}
                  onChange={(e) => updateConfig({ game: e.target.value })}
                >
                  <MenuItem value={"2019"}>2019</MenuItem>
                  <MenuItem value={"2020"}>2020</MenuItem>
                  <MenuItem value={"2021"}>2021</MenuItem>
                </Select>
              </FormControl>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.config.unlimited}
                    onChange={(e) =>
                      updateConfig({ unlimited: e.target.checked })
                    }
                    name="checkedB"
                    color="primary"
                  />
                }
                label="Unlimited"
              />
            </GameConfig>
            <CostConfigWrapper>
              <CostsConfig
                cost={state.config.extremeCost}
                setCost={(e) =>
                  dispatch({ type: "setExtremeCost", payload: e.target.value })
                }
              >
                Extreme
              </CostsConfig>
              <CostsConfig
                cost={state.config.bannedCost}
                setCost={(e) =>
                  dispatch({ type: "setBannedCost", payload: e.target.value })
                }
              >
                Banned
              </CostsConfig>
            </CostConfigWrapper>
          </GeneralConfig>
        </TabPanel>

        <TabPanel value={value} index={1}>
          <BannedControl
            songList={state.songList}
            bannedSongs={state.bannedSongs}
            dispatch={dispatch}
            bannedIds={state.config.bannedIds}
          />
        </TabPanel>
      </ConfigForm>
      <ConfigActions>
        <ButtonStyled
          onClick={SaveChangedData}
          variant="contained"
          color="primary"
        >
          Save Changes
        </ButtonStyled>
        <Snackbar
          open={!!state.alert}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="success">
            {getAlertMsg("success")}
          </Alert>
        </Snackbar>
      </ConfigActions>
    </div>
  ) : state.broadcasterType ? (
    <Spinner />
  ) : (
    <div>=D</div>
  );
};

export default Config;

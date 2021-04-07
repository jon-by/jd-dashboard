import React, { useEffect, useState, useReducer } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { initialState, reducer } from "./configReducer";
import {
  setExtremeCost,
  getExtremeCost,
  getTwitchConfig,
  setTwitchConfig,
} from "./TwitchApi";
import CostsConfig from "./CostsConfig";
import BannedControl from "./BannedControl";
import Spinner from "./Spinner";

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
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
    backgroundColor: theme.palette.background.paper,
  },
}));

const Config = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    getTwitchConfig((config) => {
      if (config) {
        dispatch({ type: "setConfig", payload: config });
        // console.log("configOBJ:", config);
      } else {
        setTwitchConfig({ extremeCost: 5, bannedCost: 10, bannedIds: [] });
      }
    });
    window.Twitch.ext.onAuthorized(function (authentication) {
      dispatch({ type: "setAuth", payload: authentication });
    });
  }, []);

  return state.config ? (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Costs" {...a11yProps(0)} />
          <Tab label="Banned" {...a11yProps(1)} />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
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
      </TabPanel>

      <TabPanel value={value} index={1}>
        <BannedControl dispatch={dispatch} {...state} />
      </TabPanel>
    </div>
  ) : (
    // <ConfigWrapper>
    //   <CostsWrapper>
    //     <CostsConfig
    //       cost={state.extremeCost}
    //       error={state.error}
    //       setCost={(e) =>
    //         dispatch({ type: "setExtremeCost", payload: e.target.value })
    //       }
    //       user={state.auth.channelId}
    //     >
    //       Extreme Cost
    //     </CostsConfig>

    //     <CostsConfig
    //       cost={state.bannedCost}
    //       error={state.error}
    //       setCost={(e) =>
    //         dispatch({ type: "setBannedCost", payload: e.target.value })
    //       }
    //       user={state.auth.channelId}
    //     >
    //       Banned Cost
    //     </CostsConfig>
    //   </CostsWrapper>

    //   <BannedControl>
    //     <SongsToBanWrapper>
    //       <SongsToBan
    //         bannedSongs={bannedSongs}
    //         setBannedSongs={setBannedSongs}
    //         setFullBannedSong={setFullBannedSong}
    //       />
    //     </SongsToBanWrapper>

    //     <BannedSongs
    //       fullBannedSong={fullBannedSong}
    //       setFullBannedSong={setFullBannedSong}
    //       handleUnBan={handleUnBan}
    //     />
    //   </BannedControl>

    //   <Snackbar
    //     open={costSuccess}
    //     autoHideDuration={3000}
    //     onClose={() => handleClose("success")}
    //   >
    //     <Alert severity="success">Cost updated</Alert>
    //   </Snackbar>
    //   <Snackbar
    //     open={costError}
    //     autoHideDuration={3000}
    //     onClose={() => handleClose("error")}
    //   >
    //     <Alert severity="error">Error while updating</Alert>
    //   </Snackbar>
    // </ConfigWrapper>
    <Spinner />
  );
};

export default Config;

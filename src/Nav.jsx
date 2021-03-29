import React from "react";
import "./Nav.css";
import Button, { btnVariants } from "./Button";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { Link } from "react-router-dom";

import { ItensWrapper } from "./Nav.styled";

const routes = [
  { title: "Panel", path: "/" },
  { title: "Config", path: "/config" },
];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  bar: {
    justifyContent: "space-between",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Nav = ({ user, logout }) => {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = (event) => {
    logout();
    handleClose();
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <nav className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.bar}>
          <ItensWrapper>
            {routes.map(({ title, path }, idx) => {
              return (
                <Link to={path} key={idx}>
                  <Typography variant="h6" className={classes.title}>
                    {title}
                  </Typography>
                </Link>
              );
            })}
          </ItensWrapper>
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <img
                className="user-avatar"
                src={user?.profile_image_url}
                alt={user?.display_name + " avatar"}
              />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </nav>
  );
};

export default Nav;

// broadcaster_type: "affiliate"
// created_at: "2017-02-17T15:29:54.662237Z"
// description: "Olá eu sou a Beatriz Xavier, tenho 29 anos sou brasileira do estado de MG, o foco do canal é o jogo Just dance mas também vou trazer outros jogos que gosto e compartilhar essa experiência com vocês! 🎮♥️"
// display_name: "BeatrizXavierjd"
// email: "beatriz.ved@gmail.com"
// id: "148003044"
// login: "beatrizxavierjd"
// offline_image_url: ""
// profile_image_url: "https://static-cdn.jtvnw.net/jtv_user_pictures/b77aaca7-6937-4d16-903d-1853401c5820-profile_image-300x300.png"
// type: ""
// view_count: 6045

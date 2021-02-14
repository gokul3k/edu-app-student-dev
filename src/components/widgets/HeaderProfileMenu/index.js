import React, { useState } from "react";
import {
  Menu,
  MenuItem,
  IconButton,
  Button,
  ListItem,
} from "@material-ui/core";
import { Person as AccountIcon } from "@material-ui/icons";
import classNames from "classnames";
import useStyles from "./styles";

import { Typography } from "../../Wrappers/Wrappers";
import { getUserInfo } from "services/userService/userInfo";
import { Link } from "react-router-dom";

export default function HeaderProfileMenu({ logoutClicked }) {
  var classes = useStyles();
  var [profileMenu, setProfileMenu] = useState(null);
  const user = getUserInfo();

  return (
    <div>
    {console.log("here")}
      <IconButton
        aria-haspopup="true"
        className={classes.headerMenuButton}
        aria-controls="profile-menu"
        onClick={(e) => setProfileMenu(e.currentTarget)}
      >
        <AccountIcon classes={{ root: classes.headerIcon }} />
      </IconButton>
      <Menu
        id="profile-menu"
        open={Boolean(profileMenu)}
        anchorEl={profileMenu}
        onClose={() => setProfileMenu(null)}
        className={classes.headerMenu}
        classes={{ paper: classes.profileMenu }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        disableAutoFocusItem
        disableScrollLock
      >
        <div className={classes.profileMenuUser}>
          
          <Typography
            className={classes.profileMenuLink}
            component="a"
            color="primary"
          >
            {user.email}
          </Typography>
        </div>
        <MenuItem
          className={classNames(
            classes.profileMenuItem,
            classes.headerMenuItem
          )}
        >
          <ListItem
            className={classes.listItem1}
            component={"/home/profile" && Link}
            to="/home/profile"
            disableGutters
          >
            {/* <ListItemIcon style={{minWidth:30}}>
          <Dashboard className={classes.icon} />
        </ListItemIcon> */}
            {/* <AccountIcon className={classes.profileMenuIcon} /> */}
            <Typography className={classes.listText}>View / Edit / Download Profile</Typography>
          </ListItem>
        </MenuItem>
        {/* <MenuItem
            className={classNames(
              classes.profileMenuItem,
              classes.headerMenuItem,
            )}
          >
            <AccountIcon className={classes.profileMenuIcon} /> Tasks
          </MenuItem> */}
        {/* <MenuItem
            className={classNames(
              classes.profileMenuItem,
              classes.headerMenuItem,
            )}
          >
            <AccountIcon className={classes.profileMenuIcon} /> Messages
          </MenuItem> */}
        <div className={classes.profileMenuUser}>
          <Button
            className={classes.signout}
            color="secondary"
            onClick={logoutClicked}
            variant="text"
            
          >
            Sign Out
          </Button>
        </div>
      </Menu>
    </div>
  );
}

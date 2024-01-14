import { NavLink, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Feature/store";
import axios from "../../Utils/axiosInstance";
import { ArrowForward, Logout, Menu as Menui } from "@mui/icons-material";
import React, { useState } from "react";
import {
  Avatar,
  Menu,
  Divider,
  IconButton,
  ListItemIcon,
  MenuItem,
  Tooltip,
  Typography,
  Box,
} from "@mui/material";
import { logoutUser } from "../../Feature/User/UserSlice";

const PopupMenu = () => {
  const user = useSelector((state: RootState) => state.user.value);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const usernameFirstWord = () => {
    const word = user.isAuthenticated && user.user.Name.toUpperCase();
    return word;
  };

  const handleLogout = async () => {
    await axios
      .get("/auth/logout")
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          dispatch(logoutUser());
        } else {
          dispatch(logoutUser());
        }
      })
      .catch((err) => dispatch(logoutUser()));
  };

  return (
    <div>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>
              {usernameFirstWord()}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {user.user.Role === "ADMIN" && (
          <MenuItem onClick={handleClose}>
            <Avatar />
            <NavLinks itemProp="black" to="/admin">
              Admin Dashboard
            </NavLinks>
          </MenuItem>
        )}

        <Divider />

        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};

const NavBar = () => {
  const user = useSelector((state: RootState) => state.user.value);
  const navigate = useNavigate();
  const location = useLocation();

  function handleLessonButton() {
    if (user.isAuthenticated && !location.pathname.includes("/course")) {
      return (
        <IconButton
          onClick={() => {
            navigate("/course");
          }}
          size="small"
        >
          <ArrowForward />
          <Typography>Continue Learning</Typography>
        </IconButton>
      );
    } else {
      return <></>;
    }
  }
  return (
    <Nav>
      <Left>
        <NavLinks to="/">CSAP</NavLinks>
      </Left>
      <Right>
        {!user.isAuthenticated && (
          <>
            <NavLinks to="/login">Login</NavLinks>
            <NavLinks to="/register">Register</NavLinks>
          </>
        )}
        {handleLessonButton()}
        {user.isAuthenticated && <PopupMenu />}
      </Right>

      {/* {user.isAuthenticated && user.user.Role === "ADMIN" && (
        <Right>
          <NavLinks to="/admin">
            <Menu />
          </NavLinks>
        </Right>
      )} */}
    </Nav>
  );
};
const NavLinks = styled(NavLink)`
  color: ${(props) => props.itemProp || "white"};
  text-decoration: none;
`;
const Nav = styled.div`
  width: 100%;
  height: 40px;
  background-color: blueviolet;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Left = styled.div`
  flex: 1;
  color: white;
  display: flex;
  align-items: center;
  justify-content: start;
  padding-left: 30px;
`;

const Right = styled.div`
  flex: 1;
  color: white;
  display: flex;
  align-items: center;
  justify-content: end;
  padding-right: 30px;
  gap: 30px;
  text-decoration: white;
`;
export default NavBar;

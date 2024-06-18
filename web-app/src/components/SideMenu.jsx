import * as React from "react";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import { RollerShades } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../store/slices/userSlice";

function SideMenu() {


  const [permissions, setPermissions] = React.useState(null)


  const dispatch = useDispatch();

  const user = useSelector((state) => state.user?.userInfo);
  React.useEffect(() => {
    if (!user) {
      dispatch(fetchUser());
    }
  }, [dispatch, user]);

  // console.log(user);

  React.useEffect(() => {
    if (user?.code === 1000) {
      user?.result?.roles.forEach(element => {
        setPermissions(element?.permissions);
      });
      // setPermissions(user?.result?.roles.forEach((role => role?.permissions)))
    }
  }, [user])

  const hasPermission = (routerName) => {
    return permissions?.some(permission => permission.name === routerName);
  };



  return (
    <>
      <Toolbar />
      <List>
        <NavLink to={'/'} className={`disabled ${({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "active" : ""}`
        } >
          <ListItem key={"home"} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText
                primary={"Home"}
                primaryTypographyProps={{ style: { fontWeight: "bold" } }}
              />
            </ListItemButton>
          </ListItem>
        </NavLink>

        {
          hasPermission("PAGE_ROLE") &&
          <NavLink to={'/users'} className={`disabled ${({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""}`
          }>
            <ListItem key={"Users"} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText
                  primary={"Users"}
                  primaryTypographyProps={{ style: { fontWeight: "bold" } }}
                />
              </ListItemButton>
            </ListItem>
          </NavLink>
        }

        {
          hasPermission("PAGE_ROLE") &&
          <NavLink to={'/roles'} className={`disabled ${({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""}`
          }>
            <ListItem key={"Roles"} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <RollerShades />
                </ListItemIcon>
                <ListItemText
                  primary={"Roles"}
                  primaryTypographyProps={{ style: { fontWeight: "bold" } }}
                />
              </ListItemButton>
            </ListItem>
          </NavLink >
        }


        {/* <NavLink to={'/blogs'} className={`disabled ${({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "active" : ""}`
        }>
          <ListItem key={"Blogs"} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Block />
              </ListItemIcon>
              <ListItemText
                primary={"Blogs"}
                primaryTypographyProps={{ style: { fontWeight: "bold" } }}
              />
            </ListItemButton>
          </ListItem>
        </NavLink> */}
        {
          hasPermission("PAGE_MANAGE_DOCTOR") &&
          <NavLink to={'/manage-doctor'} className={`disabled ${({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""}`
          }>

            <ListItem key={"ManageDoctor"} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText
                  primary={"Manage Doctor"}
                  primaryTypographyProps={{ style: { fontWeight: "bold" } }}
                />
              </ListItemButton>
            </ListItem>
          </NavLink>
        }
      </List>
      <Divider />
    </>
  );
}

export default SideMenu;

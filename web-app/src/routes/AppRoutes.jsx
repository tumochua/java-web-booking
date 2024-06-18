import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import Login from "../pages/Login";
import Home from "../pages/Home";
import ProtectedRoute from "./protected-route/ProtectedRoute";
import Test from "../pages/Test";
import CreateUsers from '../pages/create-users/CreateUsers'

import ForbiddenPage from "../pages/ForbiddenPage";
import Roles from "../pages/roles/Roles";
import Blogs from "../pages/blogs/Blogs";
import Doctor from "../pages/doctor/Doctor";
import Users from "../pages/users/Users";
import ManageDoctor from "../pages/doctor/ManageDoctor";
import Profile from "../pages/doctor/Profile";
import DetailDoctor from '../pages/doctor/DetailDoctor'
import { useEffect, useState } from "react";
import { fetchUser } from "../store/slices/userSlice";

const AppRoutes = () => {

  const [permissions, setPermissions] = useState(null)


  const dispatch = useDispatch();

  const user = useSelector((state) => state.user?.userInfo);
  useEffect(() => {
    if (!user) {
      dispatch(fetchUser());
    }
  }, [dispatch, user]);

  // console.log(user);

  useEffect(() => {
    if (user?.code === 1000) {
      user?.result?.roles.forEach(element => {
        setPermissions(element?.permissions);
      });
      // setPermissions(user?.result?.roles.map((role => role?.permissions)))
    }
  }, [user])

  // console.log(permissions);

  const checkPermission = (permissions, permissionToCheck) => {
    const hasPermission = permissions?.some(permission => permission.name === permissionToCheck);


    if (hasPermission) {
      return permissionToCheck;
    } else {
      return null;
    }
  };

  // console.log(checkPermission(permissions));

  return (
    <>

      <Router>
        <Routes>
          <Route path="/login"
            element={
              <Login />
            } />
          <Route path="/create-users"
            element={
              <CreateUsers />
            } />

          <Route path="/" element={
            <Home />
          }
          />
          <Route
            path="/roles"
            element={
              <ProtectedRoute permission={checkPermission(permissions, 'PAGE_ROLE') || 'default'}>
                <Roles />
              </ProtectedRoute>
            }
          />
          <Route
            path="/blogs"
            element={
              < Blogs />
              // <ProtectedRoute>
              // </ProtectedRoute>
            }
          />
          <Route
            path="/doctor"
            element={
              <Doctor />
              // <ProtectedRoute>
              // </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <Users />
              // <ProtectedRoute>
              // </ProtectedRoute>
            }
          />
          <Route
            path="/manage-doctor"
            element={
              <ProtectedRoute permission={checkPermission(permissions, 'PAGE_MANAGE_DOCTOR') || 'default'} >
                <ManageDoctor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-profile-doctor/:userId"
            element={
              <Profile />
              // <ProtectedRoute>
              // </ProtectedRoute>
            }
          />
          <Route
            path="/detail-doctor/:userId"
            element={
              <DetailDoctor />
              // <ProtectedRoute>
              // </ProtectedRoute>
            }
          />
          <Route
            path="/test"
            element={
              <ProtectedRoute permission="DELETE_USER">
                <Test />
              </ProtectedRoute>
            }
          />
          <Route
            path="/no-access"
            element={
              <ForbiddenPage />
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default AppRoutes;

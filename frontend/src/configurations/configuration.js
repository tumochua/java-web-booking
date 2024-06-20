export const CONFIG = {
  BACK_END: "http://localhost:5000/api/v1",
};

export const API = {
  LOGIN: "/auth/token",
  MY_INFO: "/users/my-info",
  REFRESH: "/auth/refresh",
  SIGN_UP: "/users",
  ALL_USERS: "/users",
  DELETE_USERS: "/users",
  EDIT_USERS: "/users",

  /// seach

  SEARCH_USER: "/users/search",

  /// roles

  CREATE_ROLE: "/roles",
  GET_ALL_ROLE: "/roles",
  DELETE_ROLE: "/roles",


  //permissions

  CREATE_PERMISSIONS: "/permissions",
  GET_ALL_PERMISSIONS: "/permissions",
  DELETE_PERMISSIONS: "/permissions",

  //Doctor

  CREATE_PROFILE_DOCTOR: '/doctor',
  GET_PROFILE_DOCTOR: '/doctor',


  ///appointment

  CREATE_APPOINTMENT: '/appointment',
  GET_ALL_APPOINTMENT: '/appointment',



};

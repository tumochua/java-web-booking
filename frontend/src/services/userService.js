import httpClient from "../configurations/httpClient";
import { API } from "../configurations/configuration";
import { getToken } from "./localStorageService";

export const getMyInfo = async () => {
  try {
    return await httpClient.get(API.MY_INFO, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

// export const signUp = async (username, password, firstname, lastname, email, phonenumber, address, dob, roles) => {
//   console.log(username, password, firstname, lastname, email, phonenumber, address, dob, roles);
//   const response = await httpClient.post(API.SIGN_UP, {
//     headers: {
//       'Content-Type': 'application/json', // Thiết lập header để biết rằng đây là JSON
//     },
//     username, password, firstname, lastname, email, phonenumber, address, dob, roles

//   });
//   return response
// }

export const signUp = async (userData) => {
  // try {
  //   const response = await httpClient.post(API.SIGN_UP, userData, {
  //     headers: {
  //       'Content-Type': 'application/json', // Thiết lập header để biết rằng đây là JSON
  //     },

  //   });
  //   return response
  // } catch (error) {
  //   console.log(error);
  // }
  const response = await httpClient.post(API.SIGN_UP, userData, {
    headers: {
      'Content-Type': 'application/json', // Thiết lập header để biết rằng đây là JSON
    },

  });
  return response
}



export const apiGetAllUsers = async () => {
  try {
    return await httpClient.get(`${API.ALL_USERS}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
  } catch (error) {
    console.log(error);
  }
}

export const apiDeleteUser = async (userId) => {
  try {

    return await httpClient.delete(`${API.DELETE_USERS}/${userId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
  } catch (error) {
    console.log(error);
  }
}

export const apiUpdateUser = async (userId, user) => {
  try {
    const response = await httpClient.put(`${API.EDIT_USERS}/${userId}`, user, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        // 'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};


export const apiSearchUsers = async (searchTerm) => {
  return await httpClient.get(API.SEARCH_USER, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      // 'Content-Type': 'application/json',
    },
    params: {
      searchTerm,
    },
  });
};




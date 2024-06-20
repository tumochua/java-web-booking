import httpClient from "../configurations/httpClient";
import { API } from "../configurations/configuration";
import { getToken } from "./localStorageService";
export const apiCreateProfile = async (userId, profile) => {
    try {
        const response = await httpClient.post(`${API.CREATE_PROFILE_DOCTOR}/${userId}`, profile, {
            headers: {
                Authorization: `Bearer ${getToken()}`,

                'Content-Type': 'application/json', // Thiết lập header để biết rằng đây là JSON
            },

        });
        return response
    } catch (error) {
        console.log(error);
    }
}

export const apiGetProfile = async () => {
    try {
        const response = await httpClient.get(`${API.GET_PROFILE_DOCTOR}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },

        });
        return response
    } catch (error) {
        console.log(error);
    }
}

export const apiGetProfileById = async (userId) => {
    try {
        const response = await httpClient.get(`${API.GET_PROFILE_DOCTOR}/${userId}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },

        });
        return response
    } catch (error) {
        console.log(error);
    }
}

export const apiCheckProfile = async (userId) => {
    try {
        const response = await httpClient.get(`${API.GET_PROFILE_DOCTOR}/check/${userId}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },

        });
        return response
    } catch (error) {
        console.log(error);
    }
}


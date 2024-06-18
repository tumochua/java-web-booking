import httpClient from "../configurations/httpClient";
import { API } from "../configurations/configuration";
import { getToken } from "./localStorageService";

export const apiCreatePermissions = async (permissions) => {
    try {
        const response = await httpClient.post(`${API.CREATE_PERMISSIONS}`, permissions, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
                // 'Content-Type': 'application/json',
            },
        });
        return response;
    } catch (error) {
        console.error("Error create permissions:", permissions);
        throw error;
    }
};


export const apiGetAllPermissions = async (permissions) => {
    try {
        const response = await httpClient.get(`${API.GET_ALL_PERMISSIONS}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
                // 'Content-Type': 'application/json',
            },
        });
        return response;
    } catch (error) {
        console.error("Error create permissions:", permissions);
        throw error;
    }
};


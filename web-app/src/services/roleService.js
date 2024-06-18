import httpClient from "../configurations/httpClient";
import { API } from "../configurations/configuration";
import { getToken } from "./localStorageService";

export const apiCreateRole = async (role) => {
    try {
        const response = await httpClient.post(`${API.CREATE_ROLE}`, role, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
                // 'Content-Type': 'application/json',
            },
        });
        return response;
    } catch (error) {
        console.error("Error create role:", role);
        throw error;
    }
};

export const apiGetAllRole = async (role) => {
    try {
        const response = await httpClient.get(`${API.GET_ALL_ROLE}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
                // 'Content-Type': 'application/json',
            },
        });
        return response;
    } catch (error) {
        console.error("Error create role:", role);
        throw error;
    }
};


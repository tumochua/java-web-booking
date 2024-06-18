import httpClient from "../configurations/httpClient";
import { API } from "../configurations/configuration";
import { getToken } from "./localStorageService";
export const apiCreateAppointment = async (userId, appointment) => {
    try {
        const response = await httpClient.post(`${API.CREATE_APPOINTMENT}/${userId}`, appointment, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
                'Content-Type': 'application/json',
            },

        });
        return response
    } catch (error) {
        console.log(error);
    }
}

import axios from "axios";

const GetClientData = async () => {
    try {
        const responce = await axios.get("https://onlinetestapi.gerasim.in/api/Meeting/GetAllClients");
        console.log(responce);
        return responce.data.data
    } catch (error) {
        console.log(error);
    }
};
export { GetClientData };

const GetAllClientPackags = async () => {
    try {
        const responce = await axios.get("https://onlinetestapi.gerasim.in/api/Meeting/GetAllClientPackags");
        console.log(responce);
        return responce.data.data
    } catch (error) {
        console.log(error);
    }
};
export { GetAllClientPackags };

const GetAllPackages = async () => {
    try {
        const responce = await axios.get("https://onlinetestapi.gerasim.in/api/Meeting/GetAllPackages");
        console.log(responce);
        return responce.data.data
    } catch (error) {
        console.log(error);
    }
};
export { GetAllPackages };

const GetAllBookings = async () => {
    try {
        const responce = await axios.get("https://onlinetestapi.gerasim.in/api/Meeting/GetAllBookings");
        console.log(responce);
        return responce.data.data
    } catch (error) {
        console.log(error);
    }
};
export { GetAllBookings };

const GetAllRooms = async () => {
    try {
        const responce = await axios.get("https://onlinetestapi.gerasim.in/api/Meeting/GetAllRooms");
        console.log(responce);
        return responce.data.data
    } catch (error) {
        console.log(error);
    }
};
export { GetAllRooms };

const GetAllusers = async () => {
    try {
        const responce = await axios.get("https://onlinetestapi.gerasim.in/api/Meeting/GetAllusers");
        console.log(responce);
        return responce.data.data
    } catch (error) {
        console.log(error);
    }
};
export { GetAllusers };

const GetTimeList = async () => {
    try {
        const responce = await axios.get("https://onlinetestapi.gerasim.in/api/Meeting/GetTimeList");
        console.log(responce);
        return responce.data.data
    } catch (error) {
        console.log(error);
    }
};
export { GetTimeList };

const getAllMeetingRooms = async () => {
    try {
        const responce = await axios.get("https://onlinetestapi.gerasim.in/api/Meeting/GetAllRooms");
        console.log(responce);
        return responce.data.data
    } catch (error) {
        console.log(error);
    }
};
export { getAllMeetingRooms };


const GetAdminDashboardData = async () => {
    try {
        const responce = await axios.get("https://onlinetestapi.gerasim.in/api/Meeting/getAdminDashboardData");
        console.log(responce);
        return responce.data.data
    } catch (error) {
        console.log(error);
    }
};
export { GetAdminDashboardData };


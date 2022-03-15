import { Axios } from "axios"
import { BASE_API } from '../env';
import { Room } from "../types/types";

const axios = new Axios({
    baseURL: BASE_API
})

export const fetchAllRooms = async (): Promise<Room[]> => {
    return (await axios.get<Room[]>('rooms')).data
}
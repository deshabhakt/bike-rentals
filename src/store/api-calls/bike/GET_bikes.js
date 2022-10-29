import axios from "axios";
import { URL_GET_BIKES } from "../../../utils/macros/entity-macros/bikeAPIMacros";

export const getBikes = async (count=10,skip=0) => {
    try {
        const resp = await axios.get(`${URL_GET_BIKES}?count=${count}&skip=${skip}`)
        if (resp.data.error) {
            throw resp.data.error
        }
        return resp.data.success.data
    } catch (e) {
        console.log(e, 'error bikes cout skip')
        throw e
    }
}
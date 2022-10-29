import axios from "axios";
import { URL_GET_BIKE_IMAGES } from "../../../utils/macros/entity-macros/imagesApiMacros";

export const getBikeImagesWithId = async(bikeId) => {
    try {
        const resp = await axios.get(`${URL_GET_BIKE_IMAGES}/${bikeId}`)
        if (resp.data.error) {
            throw resp.data.error
        }
        return resp.data.success.data
    } catch (e) {
        console.log(e,'error fetch bike images using bikeId route')
        throw e
    }
} 
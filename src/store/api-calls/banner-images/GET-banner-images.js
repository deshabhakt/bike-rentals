import axios from 'axios'
import { URL_GET_BANNER_IMAGES } from '../../../utils/macros/entity-macros/imagesApiMacros'

export const getBannerImages = async (count) => {
    try {
        const url = `${URL_GET_BANNER_IMAGES}/${count}`
        // console.log(url)
        const resp = await axios.get(url)
        if (resp.data.error) {
            throw resp.data.error
        }
        return resp.data.success.data
    } catch (e) {
        throw e
    }
}
import axios from "axios";

import {URL_CHANGE_USER_PASSWORD} from '../../../utils/macros/entity-macros/userApiMacros'

const changePassword = async (inputPasswords,userAuthToken) => {
    const resp = await axios.patch(
        URL_CHANGE_USER_PASSWORD,
        inputPasswords,
        {
            headers: {
                Authorization: `Bearer ${userAuthToken}`,
            },
        }
    )
    return resp.data
    
}

export default changePassword
import constants from "../constants"
import RestApi from "../RestApi";

export const CreateAccountProxy = async (username, phone, password) => {
    const [REPORTING_URL] = await constants();
    const data = {
        name: username,
        phoneNumber: phone,
        password: password
    };
    return RestApi('post', `${REPORTING_URL}/customer/create`, data);
};
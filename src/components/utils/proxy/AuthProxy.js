import constants from "../constants"
import RestApi from "../RestApi";

export const CreateAccountProxy = async (username, phone, password,email) => {
    const [REPORTING_URL] = await constants();
    const data = {
        name: username,
        phoneNumber: phone,
        password: password,
        email : email
    };
    return RestApi('post', `${REPORTING_URL}/customer/create`, data);
};

export const sendEmailOtp = async (email) => {
    const [REPORTING_URL] = await constants();
    return RestApi('post', `${REPORTING_URL}/apiv1/otp/send-otp?email=${email}`, null);
}

export const verifyEmailOtp = async (email,otp) =>{
    const [REPORTING_URL] = await constants();
    return RestApi('post',`${REPORTING_URL}/apiv1/otp/verify-otp?email=${email}&otp=${otp}`,null)
}

export const LoginProxy = async (login,password) => {
    const [REPORTING_URL] = await constants();
        const data = {
        password,
        ...(login.includes("@")
            ? { email: login }
            : { phoneNumber: login })
    };
    return RestApi('post',`${REPORTING_URL}/customer/login`,data)
}
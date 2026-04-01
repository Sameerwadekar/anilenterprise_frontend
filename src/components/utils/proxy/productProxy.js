import constants from "../constants";
import RestApi from "../RestApi";

export const getAllProducts = async () => {
    const [REPORTING_URL] = await constants();
    return RestApi('get', `${REPORTING_URL}/product/all`, null);
};

export const getProductById = async (id) => {
    const [REPORTING_URL] = await constants();
    return RestApi('get', `${REPORTING_URL}/product/${id}`, null);
};
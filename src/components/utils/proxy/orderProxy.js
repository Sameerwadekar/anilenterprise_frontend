import constants from "../constants";
import RestApi from "../RestApi";

export const createOrder = async (orderData) => {
  const [REPORTING_URL] = await constants();
  return RestApi("post", `${REPORTING_URL}/order/create`, orderData);
};
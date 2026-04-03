import constants from "../constants";
import RestApi from "../RestApi";

export const createOrder = async (orderData) => {
  const [REPORTING_URL] = await constants();
  return RestApi("post", `${REPORTING_URL}/order/create`, orderData);
};

export const getAllOrders = async () => {
   const [REPORTING_URL] = await constants();
  return RestApi("get", `${REPORTING_URL}/order/all`,null);
}

export const updateOrderStatus = async ({ orderId, status, returnedQty, paymentMethod }) => {
  const [REPORTING_URL] = await constants();
  return RestApi(
    "patch",
    `${REPORTING_URL}/order/status/${orderId}?status=${status}&returnedQty=${returnedQty}&paymentMethod=${paymentMethod}`,
    null
  );
};

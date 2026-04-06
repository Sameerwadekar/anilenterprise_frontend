import axios from "axios";

const RestApi = async (method, url, data) => {
  var config = {
    method: method,
    maxBodyLength: Infinity,
    url: url,
    headers: {
      'Content-Type': 'application/json',
      // 'ngrok-skip-browser-warning': 'true'
    },
    data: data
  };
  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data; // ✅ RETURN THIS
    } else {
      return { success: false, message: error.message };
    }
  }
}


export default RestApi;
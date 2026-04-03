import axios from "axios";

const RestApi = async (method,url,data) => {
    var config = {
        method: method,
        maxBodyLength:  Infinity,
        url:url,
        headers: {
            'Content-Type': 'application/json',
            // 'ngrok-skip-browser-warning': 'true'
        },
        data:data
    };
    try {
        const response = await axios(config);
        return response.data;
    } catch (error) {
        if (error.response) {
            // Server responded with a status code outside the 2xx range
            if (error.response.status === 500) {
              // Handle 500 error
              console.log('Server error occurred:', error.response.data);
              // You can implement custom error handling logic for 500 errors here
            }else if(error.response.status === 403){
              if(error.response.data){
                return error.response.data;
              }else{
                console.log('Error response from server:', error.response.data);  
              }
            } else {
              // Handle other error codes
              console.log('Error response from server:', error.response.data);
              // You can implement custom error handling logic for other error codes here
            }
          } else {
            // Request made but no response received
            console.log('Error making request:', error.message);
            // You can implement custom error handling logic for other errors here
          }
    }
}


export default RestApi;
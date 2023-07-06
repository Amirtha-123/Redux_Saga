import axios, { AxiosRequestConfig } from "axios";
import { API_BASE_URL } from "../constants/apiUrl.constant";
import { IApionfig } from "../../types/common/api.types";

const appId = "649165fcfde0cec753b6e4e9";

export const apiCall = async (apiConfig: IApionfig): Promise<any> => {
  try {
    const url = `${API_BASE_URL}${apiConfig.apiPath}`;
    console.log("url", url);

    const requestConfig: AxiosRequestConfig = {
      url,
      method: apiConfig.method,
      params: apiConfig.params,
      data: apiConfig.data,
      headers: {
        "app-id": appId,
      },
    };

    const response = await axios(requestConfig);

    if (response.status === 200) {
      return response;
    } else {
      console.log(`Request failed with status ${response.status}`);
    }
  } catch (error) {
    console.log(error, "error");
  }
};

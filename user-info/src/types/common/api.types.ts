import { AxiosRequestConfig } from "axios";

export interface IApionfig extends AxiosRequestConfig {
  apiPath: string;
}

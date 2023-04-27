import type { AxiosRequestConfig, AxiosResponse } from 'axios';

// 针对AxiosRequestConfig配置进行扩展
export interface ZMInterceptors<T = AxiosResponse> {
    requestSuccessFn?: (config: AxiosRequestConfig) => AxiosRequestConfig;
    requestFailureFn?: (err: any) => any;
    responseSuccessFn?: (res: T) => T;
    responseFailureFn?: (err: any) => any;
}

export interface ZMRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
    interceptors?: ZMInterceptors<T>;
}

export interface AxiosResponseData<T = any> {
    success: boolean;
    result: T;
    msg: string;
    error: any
}

export interface AxiosGPTResponseData<T = any> {
    choices: T;
    completion: string;
    created: number;
    id: string;
    model: string;
    object: string;
    search_model: string;
    selected_model: string;
    status: string;
    stream: boolean;
    temperature: number;
    time: number;
}

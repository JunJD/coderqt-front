import axios from 'axios';
import type { AxiosInstance } from 'axios';
import type { AxiosResponseData, ZMRequestConfig } from './type';

/**
 *  1.拦截器进行精细控制
 *    > 全局拦截器
 *    > 实例拦截器
 *    > 单次请求拦截器
 *
 *  2.响应结果的类型处理(泛型)
 */

class ZMRequest {
    instance: AxiosInstance;
    defaultParams: any = {};
    // request实例 => axios的实例
    constructor(config: ZMRequestConfig, defaultParams?: any) {
        this.instance = axios.create(config);
        this.defaultParams = defaultParams;
        // 每个instance实例都添加拦截器
        this.instance.interceptors.request.use(
            (config) => {
                // loading/token
                return config;
            },
            (err) => {
                throw new Error(err.message ?? '请求失败');
            },
        );
        this.instance.interceptors.response.use(
            (res) => {
                return res.data;
            },
            (err) => {
                throw new Error(err.message ?? '请求失败');
            },
        );
    }

    // 封装网络请求的方法
    // T => IHomeData
    request<T = any>(config: ZMRequestConfig<T>) {
        // 单次请求的成功拦截处理
        if (config.interceptors?.requestSuccessFn) {
            config = config.interceptors.requestSuccessFn(config);
        }
        // 返回Promise
        return new Promise<T>((resolve) => {
            this.instance
                .request<any, T>({...config, data: {...this.defaultParams, ...config.data}})
                .then((res) => {
                    // 单词响应的成功拦截处理
                    if (config.interceptors?.responseSuccessFn) {
                        res = config.interceptors.responseSuccessFn(res);
                    }
                    resolve(res);
                })
                .catch((err) => {
                    throw new Error(err.message ?? '请求失败');
                });
        });
    }

    get<T>(config: ZMRequestConfig<AxiosResponseData<T>>) {
        return this.request<AxiosResponseData<T>>({ ...config, method: 'GET' });
    }
    post<T>(config: ZMRequestConfig<AxiosResponseData<T>>) {
        return this.request<AxiosResponseData<T>>({ ...config, method: 'POST' });
    }
    delete<T>(config: ZMRequestConfig<AxiosResponseData<T>>) {
        return this.request<AxiosResponseData<T>>({ ...config, method: 'DELETE' });
    }
    patch<T>(config: ZMRequestConfig<AxiosResponseData<T>>) {
        return this.request<AxiosResponseData<T>>({ ...config, method: 'PATCH' });
    }
}

export default ZMRequest;

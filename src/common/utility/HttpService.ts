import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import { v4 as uuidv4 } from 'uuid';

export class HttpService {
    isMock: boolean;
    axios: { get: (url: string, config?: any) => Promise<unknown>; (options: any): Promise<unknown> };
    baseAction: { setLoaderCounterAction: (count: number) => unknown };
    baseURL: string;
    envConfigs: Record<string, unknown>;
    mockURL: string;
    headerConfigs: Record<string, unknown>;
    localConfigs: Record<string, unknown>;
    store: { getState: () => unknown; dispatch: (action: unknown) => void };
    storeInstance: { getAvailableActions: (type: string) => { setLoaderCounterAction: (count: number) => unknown; setErrorAction: (error: unknown[]) => unknown } };
    notificationAction: { setErrorAction: (error: unknown[]) => unknown };
    queriedUrl!: string;

    constructor(
        headerConfigs: Record<string, unknown>,
        localConfigs: Record<string, unknown>,
        envConfigs: Record<string, unknown>,
        axios: { get: (url: string, config?: any) => Promise<unknown>; (options: any): Promise<unknown> },
        store: { getState: () => unknown; dispatch: (action: unknown) => void },
        storeInstance: { getAvailableActions: (type: string) => { setLoaderCounterAction: (count: number) => unknown; setErrorAction: (error: unknown[]) => unknown } }
    ) {
        this.isMock = Boolean(localConfigs.isMock);
        this.mockURL = String(localConfigs.mockURL ?? '');
        this.baseURL = String(envConfigs.baseURL ?? '');
        this.headerConfigs = headerConfigs;
        this.envConfigs = envConfigs;
        this.localConfigs = localConfigs;
        this.store = store;
        this.storeInstance = storeInstance;
        this.axios = axios;
        this.baseAction = this.storeInstance.getAvailableActions('base');
        this.notificationAction = this.storeInstance.getAvailableActions('notification');
    }

    getCustomHeaders(customHeaders: Record<string, unknown>) {
        const customAvailableHeader = Object.keys(customHeaders);
        const headerObj: { [key: string]: unknown } = {};
        customAvailableHeader.forEach((header) => {
            if (header !== 'cache') {
                headerObj[header] = customHeaders[header];
            }
            if (header === 'cache' && !customHeaders[header]) {
                headerObj.Pragma = 'no-cache';
                headerObj.Expires = '-1';
                headerObj['Cache-Control'] = 'no-cache, no-store';
            }
            if (header === 'cache' && customHeaders[header]) {
                delete headerObj.Pragma;
                delete headerObj.Expires;
                delete headerObj['Cache-Control'];
            }
        });
        return headerObj;
    }

    getHeaders(customHeaders: Record<string, unknown>) {
        const { headerConfigs } = this;
        const availableHeaders: Array<string> = Object.keys(headerConfigs);
        const headerObj: { [key: string]: unknown } = {};
        availableHeaders.forEach((header) => {
            if (header !== 'Tracking-Id' && header !== 'cache') {
                headerObj[header] = headerConfigs[header];
            }
            if (header === 'Tracking-Id' && (headerConfigs[header] === '00000000-0000-0000-0000-000000000000' || !headerConfigs[header])) {
                headerObj['Tracking-Id'] = uuidv4();
            }
            if (header === 'cache' && !headerConfigs[header]) {
                headerObj.Pragma = 'no-cache';
                headerObj.Expires = '-1';
                headerObj['Cache-Control'] = 'no-cache, no-store';
            }
            if (header === 'cache' && headerConfigs[header]) {
                headerObj['Cache-Control'] = 'public; max-age=300';
            }
        });
        if (!_isEmpty(customHeaders)) {
            const customApiHeaders = this.getCustomHeaders(customHeaders);
            return { ...headerObj, ...customApiHeaders };
        }
        return headerObj;
    }

    http(
        method: string,
        mockName: string,
        url: string,
        payload: unknown,
        query: Record<string, unknown>,
        customHeaders: Record<string, unknown>
    ) {
        if (this.isMock) {
            return this.mockService(mockName, customHeaders);
        }
        return this.apiService(method, url, payload, query, customHeaders);
    }

    loaderAction() {
        let counter: number = _get(this.store.getState(), 'base.loaderCounter', 0);
        const loaderTimeout = typeof this.localConfigs.loaderTimeout === 'number' ? this.localConfigs.loaderTimeout : 0;
        counter = counter ? counter - 1 : counter;
        if (counter === 0) {
            setTimeout(() => {
                this.store.dispatch(this.baseAction.setLoaderCounterAction(counter));
            }, loaderTimeout);
        } else {
            this.store.dispatch(this.baseAction.setLoaderCounterAction(counter));
        }
    }

    mockService(mockName: string, customHeaders: Record<string, unknown>): Promise<unknown> {
        let loaderCounter: number = _get(this.store.getState(), 'base.loaderCounter', 0);
        const url = `${this.mockURL}/${mockName}.json`;
        loaderCounter += 1;
        this.store.dispatch(this.baseAction.setLoaderCounterAction(loaderCounter));
        return new Promise((resolve, reject) => {
            this.axios.get(url, { headers: this.getHeaders(customHeaders) }).then((resp: unknown) => {
                this.loaderAction();
                resolve(resp);
            }).catch((error: unknown) => {
                this.loaderAction();
                if (typeof error === 'object' && error && 'response' in error) {
                    this.store.dispatch(
                        this.notificationAction.setErrorAction([(error as any).response])
                    );
                }
                reject(error);
            });
        });
    }

    apiService(
        method: string,
        url: string,
        payload: unknown,
        query: Record<string, unknown>,
        customHeaders: Record<string, unknown>,
        attempt = 1
    ): Promise<unknown> {
        let loaderCounter: number = _get(this.store.getState(), 'base.loaderCounter', 0);
        const apiUrl = `${this.baseURL}/${url}`;
        loaderCounter += 1;
        this.store.dispatch(this.baseAction.setLoaderCounterAction(loaderCounter));
        return new Promise((resolve, reject) => {
            this.axios(this.getCallOptions(method, apiUrl, payload, query, customHeaders))
                .then((resp: unknown) => {
                    this.loaderAction();
                    resolve(resp);
                }).catch((error: unknown) => {
                    this.loaderAction();
                    if (
                        typeof error === 'object' && error && 'response' in error &&
                        (_get((error as any).response, 'status', '') || attempt === 2)
                    ) {
                        this.store.dispatch(
                            this.notificationAction.setErrorAction([(error as any).response])
                        );
                        reject(error);
                    } else if (attempt !== 2) {
                        this.apiService(method, url, payload, query, customHeaders, 2);
                        reject(error);
                    } else {
                        reject(error);
                    }
                });
        });
    }

    getCallOptions(
        method: string,
        url: string,
        payload: unknown,
        query: Record<string, unknown>,
        customHeaders: Record<string, unknown>
    ) {
        let queryString = '';
        if (!_isEmpty(query)) {
            Object.keys(query).map((key) => {
                const keyValue = typeof query[key] === 'undefined' || query[key] === null || query[key] === 'null' ? '' : query[key];
                queryString = queryString ? `${queryString}&${key}=${keyValue}` : `${key}=${keyValue}`;
                return queryString;
            });
        }
        this.queriedUrl = `${url}${query && queryString ? '?' : ''}${queryString}`;
        if (method === 'get') {
            return {
                method,
                url: this.queriedUrl,
                headers: this.getHeaders(customHeaders)
            };
        }
        return {
            method,
            url: this.queriedUrl,
            data: payload,
            headers: this.getHeaders(customHeaders)
        };
    }
}
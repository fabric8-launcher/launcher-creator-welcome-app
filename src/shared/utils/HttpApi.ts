import axios, {AxiosInstance} from 'axios';


export interface HttpApi {
  readonly baseUrl: string;

  getApiAbsoluteUrl(path: string);

  get<T>(path: string): Promise<T>;

  put<T>(path: string): Promise<T>;

  post<T>(path: string): Promise<T>;

  delete(path: string): Promise<any>;
}

function getLocationAbsoluteUrl(path: string) {
  const link = document.createElement('a');
  link.href = path;
  return link.href;
}

export class AxiosHttpApi implements HttpApi {

  public readonly baseUrl: string;
  private axios: AxiosInstance;

  constructor(config: {serviceUrl: string}) {
    this.axios = axios.create({
      baseURL: config.serviceUrl,
    });
    this.baseUrl = config.serviceUrl;
  }

  public get<T>(path: string): Promise<T> {
    return this.axios.get<T>(path).then(r => r.data);
  }

  public put<T>(path: string): Promise<T> {
    return this.axios.put<T>(path).then(r => r.data);
  }

  public post<T>(path: string): Promise<T> {
    return this.axios.post<T>(path).then(r => r.data);
  }

  public delete(path: string): Promise<any> {
    return this.axios.delete(path).then(r => r.data);
  }

  public getApiAbsoluteUrl(path: string) {
    return getLocationAbsoluteUrl(this.baseUrl + path);
  }



}


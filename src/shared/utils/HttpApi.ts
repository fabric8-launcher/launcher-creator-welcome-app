import axios, {AxiosInstance} from 'axios';


export interface HttpApi {
  get<T>(path: string): Promise<T>;

  put<T>(path: string): Promise<T>;

  post<T>(path: string): Promise<T>;

  delete(path: string): Promise<any>;
}

export class AxiosHttpApi implements HttpApi {

  private axios: AxiosInstance;

  constructor(config: {serviceUrl: string}) {
    this.axios = axios.create({
      baseURL: config.serviceUrl,
    });
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

}


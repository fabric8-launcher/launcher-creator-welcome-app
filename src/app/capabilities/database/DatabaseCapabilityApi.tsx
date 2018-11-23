import {HttpApi} from '../../../shared/utils/HttpApi';
import {ApiFactoryFunction} from '../connectCapability';

export interface Fruit {
  id: number;
  name: string;
  stock: number;
}

export interface DatabaseCapabilityApi {
  getFruitsAbsoluteUrl(): string;
  doFetchFruits(): Promise<{ time: number, content: Fruit[] }>;
  doPostFruit(data: { name: string; stock: number }): Promise<{ time: number, content: Fruit }>;
  doPutFruit(id: number, data: { name: string; stock: number }): Promise<{ time: number; content: Fruit }>
  doDeleteFruit(id: number):Promise<{ time: number }>
}

export class HttpDatabaseCapabilityApi implements DatabaseCapabilityApi {
  constructor(private readonly httpApi: HttpApi) {
  };

  public doFetchFruits(): Promise<{ time: number, content: Fruit[] }> {
    return this.httpApi.get('/fruits');
  }

  public getFruitsAbsoluteUrl(): string {
    return this.httpApi.getApiAbsoluteUrl('/fruits');
  }

  public doPostFruit(data: { name: string; stock: number }): Promise<{ time: number; content: Fruit }> {
    return this.httpApi.post('/fruits', data);
  }

  public doPutFruit(id: number, data: { name: string; stock: number }): Promise<{ time: number; content: Fruit }> {
    return this.httpApi.put(`/fruits/${id}`, data);
  }

  public doDeleteFruit(id: number): Promise<{ time: number }> {
    return this.httpApi.delete(`/fruits/${id}`);
  }
}

export class MockDatabaseCapabilityApi implements DatabaseCapabilityApi {

  private fruits: Fruit[] = [{
    'id': 1,
    'name': 'Apple',
    'stock': 10
  }, {
    'id': 2,
    'name': 'Orange',
    'stock': 10
  }, {
    'id': 3,
    'name': 'Pear',
    'stock': 10
  }];

  public doFetchFruits(): Promise<{ time: number, content: Fruit[] }> {
    return Promise.resolve({
      time: Date.now(),
      content: this.fruits,
    });
  }

  public getFruitsAbsoluteUrl(): string {
    return `http://mocked.io/api/fruits`;
  }

  public doPostFruit(data: { name: string; stock: number }): Promise<{ time: number; content: Fruit }> {
    return Promise.resolve({
      time: Date.now(),
      content: { ...data, id: 4 },
    });
  }

  public doDeleteFruit(id: number): Promise<{ time: number }> {
    return Promise.resolve({ time: Date.now() });
  }

  public doPutFruit(id: number, data: { name: string; stock: number }): Promise<{ time: number; content: Fruit }> {
    return Promise.resolve({
      time: Date.now(),
      content: { ...data, id },
    });
  }
}

export const databaseCapabilityApiFactory: ApiFactoryFunction<DatabaseCapabilityApi> = ({httpApi, isMockMode}) =>
  isMockMode ? new MockDatabaseCapabilityApi() : new HttpDatabaseCapabilityApi(httpApi);


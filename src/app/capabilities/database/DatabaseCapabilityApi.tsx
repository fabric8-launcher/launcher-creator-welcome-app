import {HttpApi} from '../../../shared/utils/HttpApi';
import {ApiFactoryFunction} from '../connectCapability';

export interface DatabaseCapabilityApi {
  fetchFruits(): Promise<string[]>;
}

export class HttpDatabaseCapabilityApi implements DatabaseCapabilityApi {
  constructor(private readonly httpApi: HttpApi) {};

  public fetchFruits(): Promise<string[]> {
    return this.httpApi.get('/fruits');
  }
}

export class MockDatabaseCapabilityApi implements DatabaseCapabilityApi {
  public fetchFruits(): Promise<string[]> {
    return Promise.resolve(['apple', 'orange']);
  }
}

export const databaseCapabilityApiFactory:ApiFactoryFunction<DatabaseCapabilityApi> = ({ httpApi, isMockMode }) =>
  isMockMode ? new MockDatabaseCapabilityApi() : new HttpDatabaseCapabilityApi(httpApi);


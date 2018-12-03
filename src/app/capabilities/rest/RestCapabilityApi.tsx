import {HttpApi} from '../../../shared/utils/HttpApi';
import {ApiFactoryFunction} from '../connectCapability';

export interface RestCapabilityApi {
  getGreetingAbsoluteUrl(name: string): string;
  doGetGreeting(name: string): Promise<{content: string, time: number}>;
}

function buildGreetingPath(name: string) {
  return name.length === 0 ? '/greeting' : `/greeting?name=${encodeURIComponent(name)}`;
}

class HttpRestCapabilityApi implements RestCapabilityApi {

  constructor(private readonly httpApi: HttpApi){}

  public async doGetGreeting(name: string): Promise<{content: string, time: number}> {
    const greetingPath = buildGreetingPath(name);
    const r = await this.httpApi.get<{content: string;}>(greetingPath);
    return ({ content: r.content, time: Date.now() });
  }

  public getGreetingAbsoluteUrl(name: string): string {
    return this.httpApi.getApiAbsoluteUrl(buildGreetingPath(name));
  }
}

export class MockRestCapabilityApi implements RestCapabilityApi {
  public async doGetGreeting(name: string): Promise<{content: string, time: number}> {
    return { content: 'Hello ' + (name || 'World') + '!', time: Date.now() };
  }

  public getGreetingAbsoluteUrl(name: string): string {
    return `http://mocked.io/api${buildGreetingPath(name)}`;
  }
}

export const restCapabilityApiFactory:ApiFactoryFunction<RestCapabilityApi> = ({ httpApi, isMockMode }) =>
  isMockMode ? new MockRestCapabilityApi() : new HttpRestCapabilityApi(httpApi);


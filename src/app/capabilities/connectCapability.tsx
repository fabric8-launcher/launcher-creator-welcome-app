import * as React from 'react';
import appConfig, {AppConfig, isMockMode} from '../config/appConfig';
import {HttpApi} from '../../shared/utils/HttpApi';
import appHttpApi from '../appHttpApi';

interface ApiParams {
  readonly isMockMode: boolean;
  readonly httpApi: HttpApi
  readonly appConfig: AppConfig;
}

export type ApiFactoryFunction<T> = (config: ApiParams) => T;


export default function connectCapability<T>(Component, serviceFactory: ApiFactoryFunction<T>) {
  class ConnectedCapability extends React.Component {
    public render() {
      const apiService = serviceFactory({
        isMockMode,
        httpApi: appHttpApi,
        appConfig,
      });
      return (
        <Component {...{...this.props, ...appConfig}} apiService={apiService}/>
      );
    }

  }
  return ConnectedCapability;
}
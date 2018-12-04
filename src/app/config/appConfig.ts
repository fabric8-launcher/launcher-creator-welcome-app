import {checkNotNull} from '../../shared/utils/Preconditions';
import AppDefinition from './AppDefinition';
import mockAppDefinition from './mockAppConfig';

export interface AppConfig {
  definition?: AppDefinition;
  applicationUrl: string;
  consoleUrl?: string;
  sourceRepositoryUrl?: string;
}

export const isMockMode = checkNotNull(process.env.REACT_APP_MODE, 'process.env.REACT_APP_MODE') === 'mock';

const appConfig: AppConfig = {
  applicationUrl: '/api'
};

if (!isMockMode) {
  const config = checkNotNull(process.env.REACT_APP_WELCOME_APP_CONFIG, 'process.env.REACT_APP_WELCOME_APP_CONFIG');
  try {
    appConfig.definition = JSON.parse(config);
  } catch (e) {
    throw new Error('Error while parsing WelcomeApp config: ' + e.toString());
  }
  const consoleUrl = process.env.REACT_APP_OPENSHIFT_CONSOLE || '';
  const repositoryUrl = process.env.REACT_APP_SOURCE_REPOSITORY_URL || '';
  appConfig.sourceRepositoryUrl = repositoryUrl.length > 0 ? repositoryUrl : undefined;
  appConfig.consoleUrl = consoleUrl.length > 0 ? consoleUrl : undefined;
} else {
  appConfig.definition = mockAppDefinition;
  appConfig.consoleUrl = 'http://consoleUrl.mock.io';
  appConfig.sourceRepositoryUrl = 'http://sourceRepositoryUrl.mock.io';
}

checkNotNull(appConfig.definition, 'appConfig.definition');

export default appConfig;

import {checkNotNull} from '../../shared/utils/Preconditions';
import mockAppConfig from './mock-app-config-definition.json';

interface AppDefinition {
  application: string,
  shared: {
    runtime: string,
    groupId?: string,
    artifactId?: string,
    version?: string,
  },
  extra: {
    runtimeImage: string;
    runtimeInfo: {
      id: string;
      name: string;
      description: string;
      icon: string;
      metadata: {
        language: string;
      }
    };
    runtimeService: string;
  };
  capabilities: Array<{
    module: string,
    props: { [propId: string]: string; },
    extra: { [propId: string]: string; },
  }>;
}

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
  appConfig.consoleUrl = checkNotNull(process.env.REACT_APP_OPENSHIFT_CONSOLE_URL, 'process.env.REACT_APP_OPENSHIFT_CONSOLE_URL');
  const repositoryUrl = process.env.REACT_APP_SOURCE_REPOSITORY_URL || '';
  appConfig.sourceRepositoryUrl = repositoryUrl.length > 0 ? repositoryUrl : undefined;
} else {
  appConfig.definition = mockAppConfig;
  appConfig.consoleUrl = 'http://consoleUrl.mock.io';
  appConfig.sourceRepositoryUrl = 'http://sourceRepositoryUrl.mock.io';
}

checkNotNull(appConfig.definition, 'appConfig.definition');

export default appConfig;
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
  capabilities: Array<{
    module: string,
    props: { [propId: string]: string; },
    extra: { [propId: string]: string; },
  }>;
}

export interface AppConfig {
  definition?: AppDefinition;
  applicationUrl: string;
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
} else {
  appConfig.definition = mockAppConfig;
}

checkNotNull(appConfig.definition, 'appConfig.definition');

export default appConfig;
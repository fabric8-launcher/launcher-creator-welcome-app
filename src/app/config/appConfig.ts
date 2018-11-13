import {checkNotNull} from '../../shared/utils/Preconditions';
import mockAppConfig from './mock-app-config-definition.json';

interface AppDefinition {
  applicationName: string,
  applicationUrl: string,
  capabilities: Array<{ module: string, [propId: string]: string; }>;
}

interface AppConfig {
  definition?: AppDefinition;
}

export const isMockMode = checkNotNull(process.env.REACT_APP_MODE, 'process.env.REACT_APP_MODE') === 'mock';

const appConfig: AppConfig = {

};

if (!isMockMode) {
  const config = checkNotNull(process.env.WELCOME_APP_CONFIG, 'process.env.WELCOME_APP_CONFIG');
  try {
    appConfig.definition = JSON.parse(config);
  } catch (e) {
    throw new Error('Error while parsing WelcomeApp config: ' + e.toString());
  }
} else {
  appConfig.definition = mockAppConfig;
}

export default appConfig;
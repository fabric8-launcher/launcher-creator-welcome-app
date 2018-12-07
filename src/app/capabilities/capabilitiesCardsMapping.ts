import RestCapability from './rest/RestCapability';
import connectCapability from './connectCapability';
import {restCapabilityApiFactory} from './rest/RestCapabilityApi';
import DatabaseCapability from './database/DatabaseCapability';
import {databaseCapabilityApiFactory} from './database/DatabaseCapabilityApi';
import HealthChecksCapability from './healthchecks/HealthChecksCapability';
import { healthChecksCapabilityApiFactory } from './healthchecks/HealthChecksCapabilityApi';

const capabilitiesCardsMapping = {
  healthchecks: connectCapability(HealthChecksCapability, healthChecksCapabilityApiFactory),
  rest: connectCapability(RestCapability, restCapabilityApiFactory),
  database: connectCapability(DatabaseCapability, databaseCapabilityApiFactory),
};

export default capabilitiesCardsMapping;
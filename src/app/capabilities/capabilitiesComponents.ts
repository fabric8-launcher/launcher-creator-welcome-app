import DatabaseCapability from './database/DatabaseCapability';
import RestCapability from './rest/RestCapability';
import connectCapability from '../components/connectCapability';
import {restCapabilityApiFactory} from './rest/RestCapabilityApi';
import {databaseCapabilityApiFactory} from './database/DatabaseCapabilityApi';

const capabilitiesComponents = {
  rest: connectCapability(RestCapability, restCapabilityApiFactory),
  database: connectCapability(DatabaseCapability, databaseCapabilityApiFactory),
};

export default capabilitiesComponents;
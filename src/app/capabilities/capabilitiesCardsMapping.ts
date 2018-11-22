import RestCapability from './rest/RestCapability';
import connectCapability from './connectCapability';
import {restCapabilityApiFactory} from './rest/RestCapabilityApi';

const capabilitiesCardsMapping = {
  rest: connectCapability(RestCapability, restCapabilityApiFactory),
  // database: connectCapability(DatabaseCapability, databaseCapabilityApiFactory),
};

export default capabilitiesCardsMapping;
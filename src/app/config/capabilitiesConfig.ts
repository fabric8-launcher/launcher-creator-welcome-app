export interface CapabilityConfig {
  readonly name: string;
}

const capabilitiesConfig = {
  healthchecks: {
    module: 'healthchecks',
    name: 'Health Checks',
    requireDefinition: false,
  },
  rest: {
    module: 'rest',
    name: 'HTTP APIs',
    requireDefinition: true,
  },
  database: {
    module: 'database',
    name: 'Relational Persistence',
    requireDefinition: true,
  },
};

export default capabilitiesConfig;
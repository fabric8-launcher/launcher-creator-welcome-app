export interface CapabilityConfig {
  readonly name: string;
}

const capabilitiesConfig = {
  rest: {
    name: 'HTTP APIs'
  },
  database: {
    name: 'Relational Persistence'
  },
};

export default capabilitiesConfig;
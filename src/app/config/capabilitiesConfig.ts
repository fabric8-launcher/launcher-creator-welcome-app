export interface CapabilityConfig {
  readonly name: string;
}

const capabilitiesConfig = {
  rest: {
    name: 'Http Api'
  },
  database: {
    name: 'Relational Persistence'
  },
};

export default capabilitiesConfig;
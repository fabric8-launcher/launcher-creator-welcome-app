export interface CapabilityDefinition {
  module: string;
  props: { [propId: string]: string; };
  extra: { [propId: string]: string; };
}

export interface FrontendTier {
  tier: string;
  shared: {
    framework: {
      name: string;
    },
  },
  extra: {
    frameworkImage: string;
    frameworkInfo: {
      id: string;
      name: string;
      description: string;
      icon: string;
      metadata: {
        language: string;
      }
    };
    frameworkService: string;
    frameworkRoute: string;
  };
  capabilities: CapabilityDefinition[];
}

export interface BackendTier {
  tier: string;
  shared: {
    runtime: {
      name: string;
    },
    maven?: {
      groupId?: string;
      artifactId?: string;
      version?: string;
    },
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
    runtimeRoute: string;
  };
  capabilities: CapabilityDefinition[];
}

export interface AppDefinition {
  application: string;
  tiers: Array<(BackendTier | FrontendTier)>;
}

export interface CapabilityDefinition {
  module: string;
  props: { [propId: string]: string; };
  extra: { [propId: string]: string; };
}

export interface FrontendPart {
  subFolderName?: string;
  category: string;
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

export interface BackendPart {
  subFolderName?: string;
  category: string;
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
  parts: Array<(BackendPart | FrontendPart)>;
}

function guessCategory(part: any): string {
  if(part.subFolderName) {
    return part.subFolderName;
  }
  if(part.extra.frameworkInfo) {
    return 'frontend';
  }
  return 'backend'
}

export function adaptAppDefinition(data: any): AppDefinition {
  const adapted = { 
    ...data, 
    parts: data.parts.map(p => ({ ...p, category: guessCategory(p)})).filter(p => p.category !== 'support' )
  };
  return adapted as AppDefinition;
}
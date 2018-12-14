export interface CapabilityDefinition {
  module: string;
  props: { [propId: string]: string; };
  extra: { [propId: string]: string; };
}

export interface EnumInfo {
  id: string;
  name: string;
  description: string;
  icon: string;
  metadata: {
    language: string;
  }
}

export interface ExtraInfo {
  image: string;
  route: string;
  service: string;
  enumInfo: EnumInfo;
}

export interface Part {
  subFolderName?: string;
  shared: {
    runtime?: {
      name: string;
    },
    framework?: {
      name: string;
    },
    maven?: {
      groupId?: string;
      artifactId?: string;
      version?: string;
    },
  },
  extra: {
    category: 'backend' | 'frontend' | 'support';
    frameworkInfo?: ExtraInfo;
    runtimeInfo?: ExtraInfo;
  };
  capabilities: CapabilityDefinition[];
}

export interface AppDefinition {
  application: string;
  parts: Part[];
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
    parts: data.parts.map(p => ({
       ...p, 
       extra: { ...p.extra, category: guessCategory(p) }
      }))
      .filter(p => p.extra.category !== 'support' )
  };
  return adapted as AppDefinition;
}
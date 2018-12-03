export default interface AppDefinition {
  application: string,
  shared: {
    runtime: string,
    groupId?: string,
    artifactId?: string,
    version?: string,
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
  };
  capabilities: Array<{
    module: string,
    props: { [propId: string]: string; },
    extra: { [propId: string]: string; },
  }>;
}
  
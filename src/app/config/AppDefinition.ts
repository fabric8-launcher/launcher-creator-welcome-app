export default interface AppDefinition {
  application: string;
  tiers: Array<{
    tier: string;
    shared: {
      runtime: {
        name: string;
      },
      maven: {
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
    capabilities: Array<{
      module: string,
      props: { [propId: string]: string; },
      extra: { [propId: string]: string; },
    }>;
  }>
}
  
interface IHealthCheck {
  healthcheck : IHealthCheckProperties
}

interface IHealthCheckProperties {
  fileName: string,
  fileURL: string,
  path: string,
  type: HealthCheckType,
  url: string
}

export const enum HealthCheckType {
  LIVENESS = "Liveness",
  READINESS = "Readiness"
}

export default IHealthCheck;
import * as React from 'react';
import CAPABILITIES from '../../data/Capabilities';
import Capability, { CapabilityHeader, CapabilitySpacer } from '../shared/CapabilityComponent';
import HealthCheck from './HealthCheckComponent';
import IHealthCheck from './IHealthCheck';

interface IHealthChecks {
  healthChecks: {
    liveness: IHealthCheck,
    readiness: IHealthCheck
  }
}

const HealthChecks: React.SFC<IHealthChecks> = (props) => {
  
  return (
    <Capability capability={CAPABILITIES.healthChecks}>
      <CapabilityHeader
        capability={CAPABILITIES.healthChecks}>

        <p>
          Health checks are HTTP endpoints that the codebase exposes
          for the purpose of monitoring. OpenShift will periodically hit these
          to determine that the container is functioning properly. If not, it may kill
          and/or restart the pod to maintain the targeted number of instances configured to be running.
        </p>
        <p>
          Your application has been set up with the following Health Checks.
        </p>
        <p>
          <a href="#" 
            target="_blank" 
            data-toggle="tooltip" 
            title="Visit Health Checks on OpenShift Documentation">
            Learn more <i className="fa fa-external-link-square" />
          </a>
        </p>

      </CapabilityHeader>

      <CapabilitySpacer />

      <HealthCheck
        healthcheck={props.healthChecks.liveness.healthcheck}
        />

      <CapabilitySpacer />

      <HealthCheck
        healthcheck={props.healthChecks.readiness.healthcheck}
        />

    </Capability>
  )
  
}

export default HealthChecks;
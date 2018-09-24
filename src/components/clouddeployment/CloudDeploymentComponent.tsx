import * as React from 'react';
import CAPABILITIES from '../../data/Capabilities';
import Capability, { CapabilityElement, CapabilityHeader, CapabilitySpacer } from '../shared/CapabilityComponent';

interface ICloudDeploymentProps {
  cloudDeployment : {
    applicationURL: string,
    consoleURL: string
  }
}

const CloudDeployment: React.SFC<ICloudDeploymentProps> = (props) => {
  return (
    <Capability capability={CAPABILITIES.cloudDeployment}>
      <CapabilityHeader
        capability={CAPABILITIES.cloudDeployment}
          >
          This system is deployed on the OpenShift Cloud Platform, a 
          Kubernetes distribution which builds and runs the applications 
          and services we've created.
      </CapabilityHeader>

      <CapabilitySpacer />

      <CapabilityElement
        name="Application URL"
        >
        <samp>
          <a href={props.cloudDeployment.applicationURL} target="_blank">
            {props.cloudDeployment.applicationURL} <i className="fa fa-external-link-square" />
          </a>
        </samp>
        <p>
          The link to this application running live on OpenShift
        </p>
      </CapabilityElement>
      
      <CapabilitySpacer />

      <CapabilityElement
        name="OpenShift Console URL"
        >
        <samp>
          <a href={props.cloudDeployment.consoleURL} target="_blank">
            {props.cloudDeployment.consoleURL} <i className="fa fa-external-link-square" />
          </a>
        </samp>
        <p>
          Link to manage the OpenShift instance where this application is deployed.
        </p>
      </CapabilityElement>

    </Capability>      
  );
}

export default CloudDeployment;
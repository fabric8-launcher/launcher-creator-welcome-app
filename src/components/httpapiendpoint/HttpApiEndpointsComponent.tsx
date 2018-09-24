import * as React from 'react';
import CAPABILITIES from '../../data/Capabilities';
import Capability, { 
  CapabilityElement, 
  CapabilityHeader, 
  CapabilitySpacer } from '../shared/CapabilityComponent';
import { HttpMethodType } from '../shared/Utilities'
import HttpApiEndpointComponent from './HttpApiEndpointComponent';

interface IHttpApiEndpoints {
  
  endpoints: {
    readonly baseUrl: string,
    readonly endpoints : IHttpApiEndpointProperties[],
    readonly jsonSpecUrl: string,  
    readonly swaggerUrl: string
  }
}

export interface IHttpApiEndpointProperties {
  readonly methods: HttpMethodType[]
  readonly name: string,
  readonly path: string,
  readonly sourceCodeUrl: string,
  readonly url: string
}

const HttpApiEndpoints: React.SFC<IHttpApiEndpoints> = (props) => {
  return (
    <Capability capability={CAPABILITIES.httpApiEndpoints}>

      <CapabilityHeader
        capability={CAPABILITIES.httpApiEndpoints}>

        <p>
          HTTP API endpoints expose your application to outside callers.
          Through these, programs may communicate over the network in a language-independent
          fashion. We have created an initial set of endpoints to illustrate how you may
          accomplish this in your selected runtime, Vert.x. By composing together HTTP endpoints
          and making use of hypermedia and links, you may follow these patterns to construct a
          RESTful architecture.
        </p>
        <p>
          <a href="https://developers.redhat.com/products/amq/overview/" 
            target="_blank" 
            data-toggle="tooltip"
            title="Visit Health Checks on OpenShift Documentation">
            Learn more
            at developers.redhat.com <i className="fa fa-external-link-square" />
          </a>
        </p>

      </CapabilityHeader>

      <CapabilitySpacer />

      <CapabilityHeader
        capability={CAPABILITIES.httpApiEndpoints}>

        <p>
          To illustrate how to open an HTTP endpoint in your selected runtime,
          we have created a simple service as a jumping-off point
          for your own development. This is functional out of the box and you
          may alter it to suit your needs.
        </p>

      </CapabilityHeader>

      <CapabilityElement
        name="Base URL">
        <samp>
          {props.endpoints.baseUrl}
        </samp>
      </CapabilityElement>

      <CapabilityElement
        name="Swagger URL">
        <samp>
          <a href={props.endpoints.swaggerUrl} 
            target="_blank" 
            data-toggle="tooltip" 
            title="Launch interactive Swagger documentation"
            >{props.endpoints.swaggerUrl} <i className="fa fa-external-link-square" /></a>
        </samp>
      </CapabilityElement>

      <CapabilityElement
        name="JSON Spec">
        <samp>
          <a href={props.endpoints.jsonSpecUrl} 
            target="_blank" 
            data-toggle="tooltip" 
            title="JSON Specification for consumption by integration services such as Fuse"
            >{props.endpoints.jsonSpecUrl} <i className="fa fa-external-link-square" /></a>
        </samp>
      </CapabilityElement>
      
      <CapabilitySpacer />

      {

        props.endpoints.endpoints.map((e, i) => {
          return (
            <HttpApiEndpointComponent 
              key={i}
              endpoint={e}
              index={i}
              />
          );
        })
      }

    </Capability>
  );
}

export default HttpApiEndpoints;
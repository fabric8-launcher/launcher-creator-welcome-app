import * as React from 'react';
import CAPABILITIES from '../../data/Capabilities';
import Capability, {
  CapabilityElement,
  CapabilityHeader,
  CapabilitySpacer
} from '../shared/CapabilityComponent';
import ShellCommand from '../shared/ShellCommandComponent';

interface ICodebase {
  codebase: {
    readonly baseImage: string,
    readonly repoGitURL: string,
    readonly repoHttpURL: string,
    readonly runtime: string,
    readonly runtimeDescription: string,
    readonly runtimeImage: string,
    readonly version: string,
    readonly webhooksURL: string
  }
}

const Codebase: React.SFC<ICodebase> = (props) => {
  return (
    <Capability capability={CAPABILITIES.codebase}>

      <CapabilityHeader
        capability={CAPABILITIES.codebase}>

        <h2 className="mt-0">{props.codebase.runtime}</h2>
        <p>{props.codebase.runtimeDescription}</p>
        <p>Your codebase has been customized to hook into the services selected during generation. All
          capabilities are functional end-to-end for you to explore.</p>

      </CapabilityHeader>

      <CapabilitySpacer />

      <CapabilityElement
        name="Version">
        <p>
          {props.codebase.version}
        </p>
      </CapabilityElement>

      <CapabilitySpacer />

      <CapabilityElement
        name="Git URL"
        iconClasses="fa fa-git">
        <p>
          <samp>{props.codebase.repoGitURL}</samp>
        </p>

        <ShellCommand
          command={`git clone ${props.codebase.repoGitURL}`}>
          You may use the <samp>git</samp> command-line
          client (or other preferred tooling) to clone this repository locally.
        </ShellCommand>

      </CapabilityElement>

      <CapabilitySpacer />

      <CapabilityElement
        name="GitHub URL"
        iconClasses="fa fa-github">
        <p>
          <samp>
            <a href={props.codebase.repoHttpURL} target="_blank">
              {props.codebase.repoHttpURL} <i className="fa fa-external-link-square" />
            </a>
          </samp>
        </p>
      </CapabilityElement>

      <CapabilitySpacer />

      <CapabilityElement
        name="GitHub Webhooks"
        iconClasses="fa fa-github">
        <p>
          <samp>
            <a href={props.codebase.webhooksURL} target="_blank">
              {props.codebase.webhooksURL} <i className="fa fa-external-link-square" />
            </a>
          </samp>
        </p>
        <p>
          Pushes to the master branch of this repository will trigger a build and deployment of the updated
          codebase on OpenShift.
        </p>
      </CapabilityElement>

      <CapabilitySpacer />

      <CapabilityElement
        name="Base Image">
        <p>
          <samp>
            {props.codebase.baseImage}
          </samp>
        </p>
        <p>
          This is the base image used when containerizing the codebase to run on OpenShift.
          <br /><a href="#"
            target="_blank"
            data-toggle="tooltip"
            title="Link to information about this image in the catalog"
          >Learn more <i className="fa fa-external-link-square" /></a>
        </p>
      </CapabilityElement>

    </Capability>
  );
}

export default Codebase;
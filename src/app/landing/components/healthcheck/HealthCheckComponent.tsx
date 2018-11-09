import * as React from 'react';
import { CapabilityElement } from '../shared/CapabilityComponent';
import ShellCommand from '../shared/ShellCommandComponent';
import { formatCurrentTime } from '../shared/Utilities';
import './HealthCheckComponent.css';
import IHealthCheck, { HealthCheckType } from './IHealthCheck';

const MOCK_LIVENESS_RESPONSE = '{"checks":[{"id":"server-online","status":"UP"}],"outcome":"UP"}';
const MOCK_READINESS_RESPONSE = 'OK';

class HealthCheck extends React.Component<IHealthCheck, any> {

  constructor(props: any) {
    super(props);

    this.state = {
      consoleContents: ''
    }

    this.execHc = this.execHc.bind(this);
    this.clearConsole = this.clearConsole.bind(this);
  }

  public render() {
    return (

      <CapabilityElement
        name={this.props.healthcheck.type}>

        <div className="row">
          <div className="col-sm-3">
            <samp>
              GET {this.props.healthcheck.path}
            </samp>
          </div>
          <div className="col-sm-9">

            <div
              className="btn-group btn-group-lg healthcheck-buttons"
              role="group"
              aria-label="GET Check">
              <button id={`hc${this.props.healthcheck.type.toString()}ExecuteButton`}
                className="btn btn-success"
                type="button"
                onClick={this.execHc}
              >
                Execute <i className="fa fa-play" />
              </button>
              <button id={`hc${this.props.healthcheck.type.toString()}ClearButton`}
                className="btn btn-danger"
                type="button"
                onClick={this.clearConsole}
              >
                Clear <i className="fa fa-stop" />
              </button>
            </div>
            <textarea
              id={`hc${this.props.healthcheck.type.toString()}ServerResponseConsole`}
              className="console"
              disabled={true}
              rows={5}
              value={this.state.consoleContents}
            />
            <p>
              The source for this endpoint may be found in your codebase
                at <samp><a href={this.props.healthcheck.fileURL}
                            target="_blank"
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title="Open in GitHub">
                {this.props.healthcheck.fileName} <i className="fa fa-external-link-square" /></a></samp>
            </p>

            <ShellCommand
              command={'curl ' + this.props.healthcheck.url}>
              You may test this directly by making an <samp>HTTP GET</samp> request using this
              application's URL as root. For instance, try with the <samp>cURL</samp> tool:
            </ShellCommand>

          </div>
        </div>

      </CapabilityElement>

    )
  };

  private execHc() {
    // Here's where we'll execute the HTTP GET, but for now use a mock
    const response = (this.props.healthcheck.type === HealthCheckType.LIVENESS)
      ? MOCK_LIVENESS_RESPONSE : MOCK_READINESS_RESPONSE;
    this.logToConsole(response);
  }

  private clearConsole() {
    this.setState({
      consoleContents: ''
    })
  }

  private logToConsole(response: string) {
    this.setState((state: any, props: any) => ({
      consoleContents: formatCurrentTime() + ': ' + response + '\n' + state.consoleContents
    }));
  }
}

export default HealthCheck;
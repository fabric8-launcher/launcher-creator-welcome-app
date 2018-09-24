import * as React from 'react';
import { Control, LocalForm } from 'react-redux-form';
import { CapabilityElement } from '../shared/CapabilityComponent';
import ShellCommand from '../shared/ShellCommandComponent';
import { formatCurrentTime } from '../shared/Utilities';
import { IHttpApiEndpointProperties } from './HttpApiEndpointsComponent';

const MOCK_RESPONSE_PREFIX = 'Hello, ';

export interface IHttpApiEndpoint {
  index: number;
  endpoint: IHttpApiEndpointProperties
}

class HttpApiEndpointComponent extends React.Component<IHttpApiEndpoint, any> {

  constructor(props: any) {
    super(props);

    this.state = {
      consoleContents: ""
    }

    this.execGet = this.execGet.bind(this);
    this.clearConsole = this.clearConsole.bind(this);
  }

  public render() {
    return (

      <CapabilityElement
        key={this.props.index}
        name={this.props.endpoint.name}
        url={this.props.endpoint.sourceCodeUrl}
        tooltip="View source on GitHub">

        <div className="row">

          <div className="col-sm-3">
            <samp>
              {this.props.endpoint.path}
            </samp>
          </div>
          <LocalForm
            onSubmit={this.execGet}
            >
            <div className="col-sm-9">
              <div className="input-group input-group-lg">
                <div className="input-group-btn">
                  <Control.button
                    model=".getButton"
                    className="btn btn-info"
                    type="submit"
                    data-toggle="tooltip"
                    title="Execute GET Request"
                    >GET</Control.button>
                </div>
                <span 
                  className="input-group-addon" 
                  id={"httpEndpoint" + this.props.index + "GetInput-addon"}
                  >Hello,
                </span>
                <Control.text
                  model=".name"
                  className="form-control"
                  placeholder="World" />
              </div>
              <Control.textarea 
                model=".console"
                className="console"
                rows={5}
                disabled={true}
                value={this.state.consoleContents}
                />

              <ShellCommand
                command={"curl " + this.props.endpoint.url}>
                You may test this directly by making an <samp>HTTP GET</samp> request using this
                application's URL as root. For instance, try with the <samp>cURL</samp> tool:
              </ShellCommand>

            </div>
          </LocalForm>

          

        </div>

      </CapabilityElement>

    );
  };

  private execGet =  (e: React.FormEvent<HTMLFormElement>, event: any) => {
    // Um, there has got to be a more intelligent way of getting at this than index-based whatever, right?
    const fieldValue = event.target[1].value;
    event.target[1].value = "";
    const name = fieldValue ? fieldValue : "World";
    this.logToConsole(MOCK_RESPONSE_PREFIX + name);
  };

  private clearConsole() {
    this.setState({
      consoleContents: ""
    })
  }

  private logToConsole(response: string) {
    this.setState((state: any, props: any) => ({
      consoleContents: formatCurrentTime() + ": " + response + '\n' + state.consoleContents
    }));
  }
}

export default HttpApiEndpointComponent;
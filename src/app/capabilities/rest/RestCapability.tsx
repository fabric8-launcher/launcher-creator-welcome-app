import * as React from 'react';
import Capability from '../Capability';
import capabilitiesConfig from 'app/config/capabilitiesConfig';
import {HttpApi} from 'shared/utils/HttpApi';
import appConfig, {isMockMode} from '../../config/appConfig';
import appHttpApi from '../../appHttpApi';
import RestCapabilityApi from './RestCapabilityApi';
import ShellCommand from '../../../shared/components/ShellCommand';
import * as moment from 'moment';

import './RestCapability.css';
import {Button, TextInput} from '@patternfly/react-core';
import {Console} from '../../../shared/components/Console';

class HttpRestCapabilityApi implements RestCapabilityApi {
  private httpApi: HttpApi = appHttpApi;

  public get(name: string): Promise<string> {
    return this.httpApi.get('/greetings/' + name);
  }
}

class MockRestCapabilityApi implements RestCapabilityApi {
  public get(name: string): Promise<string> {
    return Promise.resolve('Hello ' + (name || 'World') + '!');
  }
}

interface RestCapabilityProps {
}

interface RestCapabilityState {
  consoleContent: string;
  params: {
    [name: string]: string;
  }
}

export default class RestCapability extends React.Component<RestCapabilityProps, RestCapabilityState> {
  private readonly httpService = isMockMode ? new MockRestCapabilityApi() : new HttpRestCapabilityApi();

  constructor(props) {
    super(props);

    this.state = {
      consoleContent: '',
      params: {
        name: '',
      },
    };
  }

  public render() {

    return (
      <Capability module="rest">
        <Capability.Title>{capabilitiesConfig.rest.name}</Capability.Title>
        <Capability.Body>
          <div className="row">
            <div className="col-sm-3">
              <samp>
                {(appConfig.definition != null ? appConfig.definition.applicationUrl : '')}
              </samp>
            </div>
              <div className="col-sm-9">
                <div className="input-group input-group-lg">
                  <div className="input-group-btn">
                    <Button
                      className={'http'}
                      onClick={this.execGet}
                      title="Execute GET Request"
                    >GET</Button>
                  </div>
                  <span className="input-group-addon" id={'httpEndpointGetInput-addon'}>
                    Hello,
                  </span>
                  <TextInput id="http-api-name-input"
                             value={this.state.params.name}
                             onChange={this.handleInputChange}
                             name="name" placeholder="World" className="http-param"/>
                </div>
                <Console id="rest-content" content={this.state.consoleContent} />
                <ShellCommand
                  command={'curl ' + (appConfig.definition != null ? appConfig.definition.applicationUrl : '')}>
                  You may test this directly by making an <samp>HTTP GET</samp> request using this
                  application's URL as root. For instance, try with the <samp>cURL</samp> tool:
              </ShellCommand>
              </div>
          </div>
        </Capability.Body>
      </Capability>
    );
  }

  private execGet = (values) => {
    this.httpService.get(this.state.params.name).then(value => {
      this.logToConsole(value);
    });
  }


  private handleInputChange = (checked, event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      params: {
        ...this.state.params,
        [name]: value,
      }
    });
  }

  private logToConsole(response: string) {
    this.setState({
      consoleContent: `${moment().format('LTS')}: ${response}\n${this.state.consoleContent}`
    });
  }

}

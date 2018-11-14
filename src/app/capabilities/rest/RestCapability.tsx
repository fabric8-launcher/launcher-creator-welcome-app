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
import {Button, Grid, GridItem, Split, SplitItem, TextInput} from '@patternfly/react-core';
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
    const url = appConfig.definition!.applicationUrl;
    return (
      <Capability module="rest">
        <Capability.Title>{capabilitiesConfig.rest.name}</Capability.Title>
        <Capability.Body>
          <Grid>
            <GridItem span={12}>
              <Split>
                <SplitItem isMain={false}>
                  <TextInput id="http-api-path-input" isDisabled={true} value={`${url}/greetings/`}/>
                </SplitItem>
                <SplitItem isMain={true}>
                  <TextInput id="http-api-name-input"
                             value={this.state.params.name}
                             onChange={this.handleInputChange}
                             name="name" placeholder="World" className="http-param"/>
                </SplitItem>
                <SplitItem isMain={false}>
                  <Button
                    className={'http'}
                    onClick={this.execGet}
                    title="Execute GET Request"
                  >GET</Button>
                </SplitItem>
              </Split>
              <Console id="rest-content" content={this.state.consoleContent}/>
            </GridItem>
            <GridItem span={12}>
              <p>
                You may test this directly by making an <samp>HTTP GET</samp> request using this
                application's URL as root. For instance, try with the <samp>cURL</samp> tool:
              </p>
              <ShellCommand command={`curl ${this.getGreetingsUrl()}`} />
            </GridItem>
          </Grid>
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
    const url = this.getGreetingsUrl();
    this.setState({
      consoleContent: `> ${moment().format('LTS')} GET ${url}: ${response}\n${this.state.consoleContent}`
    });
  }

  private getGreetingsUrl() {
    const name = this.state.params.name.length > 0 ? this.state.params.name : 'World';
    return `${appConfig.definition!.applicationUrl}/greetings/${name}`;
  }
}

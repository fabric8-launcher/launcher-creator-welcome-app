import * as React from 'react';
import Capability from '../Capability';
import ShellCommand from '../../../shared/components/ShellCommand';
import * as moment from 'moment';

import './RestCapability.css';
import {Button, Grid, GridItem, Split, SplitItem, TextInput} from '@patternfly/react-core';
import {Console} from '../../../shared/components/Console';
import {RestCapabilityApi} from './RestCapabilityApi';
import capabilitiesConfig from '../../config/capabilitiesConfig';

interface RestCapabilityProps {
  apiService: RestCapabilityApi;
}

interface RestCapabilityState {
  consoleContent: string;
  results: Array<{content: string, time: number}>;
  params: {
    [name: string]: string;
  }
}

export default class RestCapability extends React.Component<RestCapabilityProps, RestCapabilityState> {

  constructor(props) {
    super(props);

    this.state = {
      results: [],
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
          <Grid>
            <GridItem span={12}>
              <Split>
                <SplitItem isMain={false}>
                  <TextInput id="http-api-path-input" isDisabled={true} value={`/greetings/`}/>
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
              <ShellCommand command={`curl ${this.getGreetingsUrl()}`}/>
            </GridItem>
          </Grid>
        </Capability.Body>
      </Capability>
    );
  }

  private execGet = (values) => {
    this.props.apiService.doGetGreeting(this.state.params.name).then(result => {
      this.setState({
        results: [...this.state.results, result],
      });
      this.logToConsole(result);
    });
  }


  private handleInputChange = (_, event) => {
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

  private logToConsole(result: {content: string, time: number}) {
    const url = this.getGreetingsUrl();
    this.setState({
      consoleContent: `> ${moment(result.time).format('LTS')} GET ${url}: ${result.content}\n${this.state.consoleContent}`
    });
  }

  private getGreetingsUrl() {
    return this.props.apiService.getGreetingAbsoluteUrl(this.state.params.name);
  }
}
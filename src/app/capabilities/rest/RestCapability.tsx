import * as React from 'react';
import CapabilityCard from '../../components/CapabilityCard';
import ShellCommand from '../../../shared/components/ShellCommand';
import * as moment from 'moment';

import './RestCapability.css';
import {Badge, Button, Grid, GridItem, TextInput} from '@patternfly/react-core';
import {Console} from '../../../shared/components/Console';
import {RestCapabilityApi} from './RestCapabilityApi';
import capabilitiesConfig from '../../config/capabilitiesConfig';
import {PlugIcon} from '@patternfly/react-icons';

interface RestCapabilityProps {
  apiService: RestCapabilityApi;
}

interface RestCapabilityState {
  consoleContent: string;
  results: Array<{ content: string, time: number }>;
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
      <CapabilityCard module="rest">
        <CapabilityCard.Title><PlugIcon/>{capabilitiesConfig.rest.name}</CapabilityCard.Title>
        <CapabilityCard.Body>
          <Grid>
            <GridItem span={12}>
              HTTP API endpoints expose your application to outside callers.
              Through these, programs may communicate over the network in a language-independent fashion.
              We have created an initial set of endpoints to illustrate how you may accomplish this in your selected runtime,
              Vert.x. By composing together HTTP endpoints and making use of hypermedia and links,
              you may follow these patterns to construct a RESTful architecture.
            </GridItem>
            <CapabilityCard.Separator/>
            <GridItem span={2}>
              /greetings
            </GridItem>
            <GridItem span={1}>
              <Badge>GET</Badge>
            </GridItem>
            <GridItem span={7}>
              <TextInput id="http-api-name-input"
                         value={this.state.params.name}
                         onChange={this.handleInputChange}
                         name="name" placeholder="World" className="http-param"/>
            </GridItem>
            <GridItem span={2}>
              <Button
                className={'http'}
                onClick={this.execGet}
                title="Execute GET Request"
              >Execute</Button>
            </GridItem>
            <GridItem span={12}>
              <Console id="rest-content" content={this.state.consoleContent}/>
            </GridItem>
            <CapabilityCard.Separator/>
            <GridItem span={12}>
              <p>
                You may test this directly by making an <samp>HTTP GET</samp> request using this
                application's URL as root. For instance, try with the <samp>cURL</samp> tool:
              </p>
              <ShellCommand command={`curl ${this.getGreetingsUrl()}`}/>
            </GridItem>
          </Grid>
        </CapabilityCard.Body>
      </CapabilityCard>
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

  private logToConsole(result: { content: string, time: number }) {
    const url = this.getGreetingsUrl();
    this.setState({
      consoleContent: `> ${moment(result.time).format('LTS')} GET ${url}: ${result.content}\n${this.state.consoleContent}`
    });
  }

  private getGreetingsUrl() {
    return this.props.apiService.getGreetingAbsoluteUrl(this.state.params.name);
  }
}
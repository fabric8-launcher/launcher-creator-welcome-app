import * as React from 'react';
import {Card, CardBody, CardHeader} from '@patternfly/react-core';
import './Capability.css';

interface CapabilityProps {
  module: string;
}

export default class Capability extends React.Component<CapabilityProps> {

  public static Title = (props) => (<CardHeader>{props.children}</CardHeader>);
  public static Body = (props) => (<CardBody>{props.children}</CardBody>);

  constructor(props) {
    super(props);

  }

  public render() {
    return (
      <Card id={`${this.props.module}-capability`} className="capability-card">
        {this.props.children}
      </Card>
    );
  }

}
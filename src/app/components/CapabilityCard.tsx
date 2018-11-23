import * as React from 'react';
import {Card, CardBody, CardHeader} from '@patternfly/react-core';
import './CapabilityCard.css';

interface CapabilityProps {
  module: string;
}

export default class CapabilityCard extends React.Component<CapabilityProps> {

  public static Title = (props) => (<CardHeader className="capability-card-header">{props.children}</CardHeader>);
  public static Body = (props) => (<CardBody className="capability-card-body">{props.children}</CardBody>);
  public static Separator = () => (<div className="capability-card-separator" ><hr/></div>);

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
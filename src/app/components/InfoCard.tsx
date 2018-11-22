import * as React from 'react';
import {Card, CardBody, CardHeader} from '@patternfly/react-core';
import './InfoCard.css';

interface CapabilityProps {
  name: string;
}

export default class InfoCard extends React.Component<CapabilityProps> {

  public static Title = (props) => (<CardHeader className="info-card-header">{props.children}</CardHeader>);
  public static Body = (props) => (<CardBody className="info-card-body">{props.children}</CardBody>);
  public static Separator = () => (<div className="info-card-separator" ><hr/></div>);

  constructor(props) {
    super(props);
  }

  public render() {
    return (
      <Card id={`${this.props.name}-info`} className="info-card" style={{ marginBottom: '10px' }}>
        {this.props.children}
      </Card>
    );
  }

}
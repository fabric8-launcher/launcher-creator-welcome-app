import * as React from 'react';
import {ReactNode} from 'react';
import {Button, Grid, GridItem} from '@patternfly/react-core';

import './HttpRequest.css';

interface HttpRequestProps {
  readonly method: string;
  readonly path: string;
  readonly children?: ReactNode;

  onExecute(): void;
}

const HttpRequest: React.SFC<HttpRequestProps> = ({method, path, children, onExecute}: HttpRequestProps) => (
  <Grid className="http-request">
    <GridItem span={1}>
      <span className="http-request-method">{method}</span>
    </GridItem>
    <GridItem span={2} className="http-request-path">
      {path}
    </GridItem>
    <GridItem span={8}>
      {children}
    </GridItem>
    <GridItem span={1} style={{textAlign: 'right'}}>
      <Button
        className={'http-request-button'}
        onClick={onExecute}
        title="Execute GET Request"
      >Execute</Button>
    </GridItem>
  </Grid>
);


export default HttpRequest;
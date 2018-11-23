import * as React from 'react';
import {ReactNode} from 'react';
import {Button, Grid, GridItem} from '@patternfly/react-core';

import './HttpRequest.css';
import ShellCommand from './ShellCommand';

interface HttpRequestProps {
  readonly method: string;
  readonly path: string;
  readonly curlCommand?: string;
  readonly children?: ReactNode;

  onExecute(): void;
}

const HttpRequest: React.SFC<HttpRequestProps> = ({method, path, curlCommand, children, onExecute}: HttpRequestProps) => (
  <Grid className={`http-request method-${method.toLowerCase()}`}>
    <GridItem span={11}>
      <div className="http-request-def">
        <span className="http-request-method">{method}</span> <span className="http-request-path">{path}</span>
        {children}
        {curlCommand && (<ShellCommand onlyButton={true} buttonText="Copy as curl" command={curlCommand}/>)}
      </div>
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
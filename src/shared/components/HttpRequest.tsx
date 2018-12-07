import { Button } from '@patternfly/react-core';
import * as React from 'react';
import { ReactNode } from 'react';
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
  <div className={`http-request method-${method.toLowerCase()}`}>
    <div className="definition">
      <div className="http-request-def">
        <span className="http-request-method">{method}</span> <span className="http-request-path">{path}</span>
        {children}
        {curlCommand && (<ShellCommand onlyButton={true} buttonText="Copy as curl" command={curlCommand}/>)}
      </div>
    </div>
    <div className="action">
      <Button
        className={'http-request-button'}
        onClick={onExecute}
        title="Execute GET Request"
      >Execute</Button>
    </div>
  </div>
);


export default HttpRequest;